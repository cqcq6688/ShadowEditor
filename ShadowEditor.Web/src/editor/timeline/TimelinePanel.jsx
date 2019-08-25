import './css/TimelinePanel.css';

import { classNames, PropTypes, Timeline } from '../../third_party';

/**
 * 时间轴面板
 * @author tengge / https://github.com/tengge1
 */
class TimelinePanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            animations: [],
            selectedLayer: null,
        };

        this.handleAddLayer = this.handleAddLayer.bind(this);
        this.commitAddLayer = this.commitAddLayer.bind(this);
        this.handleEditLayer = this.handleEditLayer.bind(this);
        this.commitEditLayer = this.commitEditLayer.bind(this);
        this.handleDeleteLayer = this.handleDeleteLayer.bind(this);
        this.commitDeleteLayer = this.commitDeleteLayer.bind(this);
        this.handleSelectedLayerChange = this.handleSelectedLayerChange.bind(this);

        this.handleAddAnimation = this.handleAddAnimation.bind(this);
        this.handleDropAnimation = this.handleDropAnimation.bind(this);

        this.updateUI = this.updateUI.bind(this);
    }

    render() {
        const { animations, selectedLayer } = this.state;

        return <Timeline
            className={'TimelinePanel'}
            animations={animations}
            selectedLayer={selectedLayer}

            onAddLayer={this.handleAddLayer}
            onEditLayer={this.handleEditLayer}
            onDeleteLayer={this.handleDeleteLayer}
            onSelectedLayerChange={this.handleSelectedLayerChange}

            onAddAnimation={this.handleAddAnimation}
            onDropAnimation={this.handleDropAnimation}></Timeline>;
    }

    componentDidMount() {
        app.on(`appStarted.TimelinePanel`, this.updateUI);
        app.on(`animationChanged.TimelinePanel`, this.updateUI);
    }

    updateUI() {
        this.setState({
            animations: app.editor.animations,
        });
    }

    // ----------------------- 动画层管理 ------------------------------

    handleAddLayer() {
        app.prompt({
            title: _t('Input Layer Name'),
            content: _t('Layer Name'),
            value: _t('New Layer'),
            onOK: this.commitAddLayer,
        });
    }

    commitAddLayer(layerName) {
        let animations = app.editor.animations;
        const layer = Math.max.apply(Math, animations.map(n => n.layer)) + 1;

        animations.push({
            id: null,
            layer,
            layerName: layerName,
            uuid: THREE.Math.generateUUID(),
            animations: [],
        });

        app.call(`animationChanged`, this);
    }

    handleEditLayer(id, event) {
        if (!id) {
            app.toast(_t('Please select an animation layer.'));
            return;
        }

        const animations = app.editor.animations;

        const layer = animations.filter(n => n.uuid === id)[0];

        app.prompt({
            title: _t('Edit Layer Name'),
            content: _t('Layer Name'),
            value: layer.layerName,
            onOK: this.commitEditLayer,
        });
    }

    commitEditLayer(layerName) {
        let animations = app.editor.animations;

        const index = animations.findIndex(n => n.uuid === this.state.selectedLayer);

        if (index > -1) {
            animations[index].layerName = layerName;

            app.call(`animationChanged`, this);
        }
    }

    handleDeleteLayer(id, event) {
        if (!id) {
            app.toast(_t('Please select an animation layer.'));
            return;
        }

        const animations = app.editor.animations;

        const layer = animations.filter(n => n.uuid === id)[0];

        app.confirm({
            title: _t('Delete'),
            content: _t(`Delete animation layer {{layerName}}?`, { layerName: layer.layerName }),
            onOK: this.commitDeleteLayer,
        });
    }

    commitDeleteLayer() {
        let animations = app.editor.animations;

        const index = animations.findIndex(n => n.uuid === this.state.selectedLayer);

        if (index > -1) {
            animations.splice(index, 1);

            app.call(`animationChanged`, this);
        }
    }

    handleSelectedLayerChange(value) {
        this.setState({
            selectedLayer: value,
        });
    }

    // ---------------------------- 动画管理 ---------------------------------

    handleAddAnimation(layerID, beginTime, endTime, event) {
        let layer = app.editor.animations.filter(n => n.uuid === layerID)[0];

        if (!layer) {
            console.warn(`TimelinePanel: layer ${layerID} is not defined.`);
            return;
        }

        layer.animations.push({
            id: null,
            uuid: THREE.Math.generateUUID(),
            name: _t('Animation'),
            target: null,
            type: 'Tween',
            beginTime,
            endTime,
            data: null,
        });

        app.call(`animationChanged`, this);
    }

    handleDropAnimation(id, oldLayerID, newLayerID, beginTime, event) {
        let oldLayer = app.editor.animations.filter(n => n.uuid === oldLayerID)[0];

        if (!oldLayer) {
            console.warn(`TimelinePanel: layer ${oldLayerID} is not defined.`);
            return;
        }

        let newLayer = app.editor.animations.filter(n => n.uuid === newLayerID)[0];

        if (!newLayer) {
            console.warn(`TimelinePanel: layer ${newLayerID} is not defined.`);
            return;
        }

        let index = oldLayer.animations.findIndex(n => n.uuid === id);

        if (index === -1) {
            console.warn(`TimelinePanel: animation ${id} is not defined.`);
            return;
        }

        let animation = oldLayer.animations[index];

        let duration = animation.endTime - animation.beginTime;

        animation.beginTime = beginTime;
        animation.endTime = beginTime + duration;

        oldLayer.animations.splice(index, 1);
        newLayer.animations.push(animation);

        app.call(`animationChanged`, this);
    }

    updateSlider() {
        var timeline = UI.get('timeline', this.id);
        var slider = UI.get('slider', this.id);
        var time = UI.get('time', this.id);
        var speed = UI.get('speed', this.id);

        slider.dom.style.left = this.sliderLeft + 'px';

        var animationTime = this.sliderLeft / timeline.scale;

        var minute = ('0' + Math.floor(animationTime / 60)).slice(-2);
        var second = ('0' + Math.floor(animationTime % 60)).slice(-2);

        time.setValue(`${minute}:${second}`);

        if (this.speed >= 4) {
            speed.dom.innerHTML = `X ${this.speed / 4}`;
        } else {
            speed.dom.innerHTML = `X 1/${4 / this.speed}`;
        }

        app.call('animationTime', this, animationTime);
    }

    onAnimate() {
        var timeline = UI.get('timeline', this.id);
        this.sliderLeft += this.speed / 4;

        if (this.sliderLeft >= timeline.dom.clientWidth) {
            this.sliderLeft = 0;
        }

        this.updateSlider();
    }

    // ----------------------------------- 播放器事件 -------------------------------------------

    onPlay() {
        if (this.status === PLAY) {
            return;
        }
        this.status = PLAY;

        UI.get('btnPlay', this.id).dom.style.display = 'none';
        UI.get('btnPause', this.id).dom.style.display = '';

        app.on(`animate.`, this.onAnimate.bind(this));
    };

    onPause() {
        if (this.status === PAUSE) {
            return;
        }
        this.status = PAUSE;

        UI.get('btnPlay', this.id).dom.style.display = '';
        UI.get('btnPause', this.id).dom.style.display = 'none';

        app.on(`animate.TimelinePanel`, null);
        this.updateSlider();
    }

    onForward() {
        if (this.speed >= 16) {
            return;
        }
        this.speed *= 2;
    }

    onBackward() {
        if (this.speed <= 1) {
            return;
        }
        this.speed /= 2;
    }

    onStop() {
        if (this.status === STOP) {
            return;
        }
        this.status = STOP;

        UI.get('btnPlay', this.id).dom.style.display = '';
        UI.get('btnPause', this.id).dom.style.display = 'none';

        app.on(`animate.TimelinePanel`, null);
        this.sliderLeft = 0;
        this.updateSlider();
    }

    onResetAnimation() {
        this.onStop();
        this.speed = 4;
    }

    onClick(event) {
        if (!event.target.data || !event.target.data.type) {
            return;
        }
        app.call('tabSelected', this, 'animation');
        app.call('animationSelected', this, event.target.data);
    }

    onDblClick(event) {
        var timeline = UI.get('timeline', this.id);

        if (event.target.data && event.target.data.layer !== undefined) {
            event.stopPropagation();

            var animation = {
                id: null,
                uuid: THREE.Math.generateUUID(),
                name: `${_t('Animation')}${ID--}`,
                target: null,
                type: 'Tween',
                beginTime: event.offsetX / timeline.scale,
                endTime: (event.offsetX + 80) / timeline.scale,
                data: {
                    beginStatus: 'Current', // 开始状态：Current-当前位置、Custom-自定义位置
                    beginPositionX: 0,
                    beginPositionY: 0,
                    beginPositionZ: 0,
                    beginRotationX: 0,
                    beginRotationY: 0,
                    beginRotationZ: 0,
                    beginScaleLock: true,
                    beginScaleX: 1.0,
                    beginScaleY: 1.0,
                    beginScaleZ: 1.0,
                    ease: 'linear', // linear, quadIn, quadOut, quadInOut, cubicIn, cubicOut, cubicInOut, quartIn, quartOut, quartInOut, quintIn, quintOut, quintInOut, sineIn, sineOut, sineInOut, backIn, backOut, backInOut, circIn, circOut, circInOut, bounceIn, bounceOut, bounceInOut, elasticIn, elasticOut, elasticInOut
                    endStatus: 'Current',
                    endPositionX: 0,
                    endPositionY: 0,
                    endPositionZ: 0,
                    endRotationX: 0,
                    endRotationY: 0,
                    endRotationZ: 0,
                    endScaleLock: true,
                    endScaleX: 1.0,
                    endScaleY: 1.0,
                    endScaleZ: 1.0,
                }
            };

            event.target.data.animations.push(animation);
            app.call('animationChanged', this);
        }
    }

    // ----------------------- 拖动动画事件 ---------------------------------------------

    onDragStartAnimation(event) {
        event.dataTransfer.setData('uuid', event.target.data.uuid);
        event.dataTransfer.setData('offsetX', event.offsetX);
    }

    onDragEndAnimation(event) {
        event.dataTransfer.clearData();
    }

    onDragEnterLayer(event) {
        event.preventDefault();
    }

    onDragOverLayer(event) {
        event.preventDefault();
    }

    onDragLeaveLayer(event) {
        event.preventDefault();
    }

    onDropLayer(event) {
        event.preventDefault();
        var uuid = event.dataTransfer.getData('uuid');
        var offsetX = event.dataTransfer.getData('offsetX');

        var groups = app.editor.animations;

        var group_index = -1;
        var group = null;
        var animation_index = -1;
        var animation = null;

        for (var i = 0; i < groups.length; i++) {
            var index = groups[i].animations.findIndex(n => n.uuid === uuid);

            if (index > -1) {
                group_index = i;
                group = groups[i];
                animation_index = index;
                animation = group.animations[index];
                break;
            }
        }

        if (!animation) {
            return;
        }

        if (event.target.parentElement.data && event.target.parentElement.data.animations) { // 拖动到其他动画上
            app.toast(_t('Dragging animation on other animation is not allowed.'));
            return;
        }

        group.animations.splice(animation_index, 1);

        var timeline = UI.get('timeline', this.id);

        var length = animation.endTime - animation.beginTime;

        if (event.target.data && event.target.data.animations) {
            animation.beginTime = (event.offsetX - offsetX) / timeline.scale;
            animation.endTime = animation.beginTime + length;
            event.target.data.animations.splice(event.target.data.animations.length, 0, animation);
        }

        this.updateUI();
    }
}

export default TimelinePanel;