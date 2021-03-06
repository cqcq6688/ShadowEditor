import { MenuItem, MenuItemSeparator } from '../../third_party';
import AddObjectCommand from '../../command/AddObjectCommand';

import Group from '../../object/geometry/Group';
import Plane from '../../object/geometry/Plane';
import Box from '../../object/geometry/Box';
import Circle from '../../object/geometry/Circle';
import Cylinder from '../../object/geometry/Cylinder';
import Sphere from '../../object/geometry/Sphere';
import Icosahedron from '../../object/geometry/Icosahedron';
import Torus from '../../object/geometry/Torus';
import TorusKnot from '../../object/geometry/TorusKnot';
import Teapot from '../../object/geometry/Teapot';
import Lathe from '../../object/geometry/Lathe';

import UnscaledText from '../../object/text/UnscaledText';
import Add3DTextWindow from './window/Add3DTextWindow.jsx';

import LineCurve from '../../object/line/LineCurve';
import CatmullRomCurve from '../../object/line/CatmullRomCurve';
import QuadraticBezierCurve from '../../object/line/QuadraticBezierCurve';
import CubicBezierCurve from '../../object/line/CubicBezierCurve';
import EllipseCurve from '../../object/line/EllipseCurve';

import PointMarkTool from '../tools/PointMarkTool';

import Sprite from '../../object/geometry/Sprite';

/**
 * 物体菜单
 * @author tengge / https://github.com/tengge1
 */
class ObjectMenu extends React.Component {
    constructor(props) {
        super(props);

        this.handleAddGroup = this.handleAddGroup.bind(this);

        this.handleAddPlane = this.handleAddPlane.bind(this);
        this.handleAddBox = this.handleAddBox.bind(this);
        this.handleAddCircle = this.handleAddCircle.bind(this);
        this.handleAddCylinder = this.handleAddCylinder.bind(this);
        this.handleAddSphere = this.handleAddSphere.bind(this);
        this.handleAddIcosahedron = this.handleAddIcosahedron.bind(this);
        this.handleAddTorus = this.handleAddTorus.bind(this);
        this.handleAddTorusKnot = this.handleAddTorusKnot.bind(this);
        this.handleAddTeaport = this.handleAddTeaport.bind(this);
        this.handleAddLathe = this.handleAddLathe.bind(this);

        this.handleAddUnscaledText = this.handleAddUnscaledText.bind(this);
        this.handleAdd3DText = this.handleAdd3DText.bind(this);

        this.handleAddLineCurve = this.handleAddLineCurve.bind(this);
        this.handleAddCatmullRomCurve = this.handleAddCatmullRomCurve.bind(this);
        this.handleAddQuadraticBezierCurve = this.handleAddQuadraticBezierCurve.bind(this);
        this.handleAddCubicBezierCurve = this.handleAddCubicBezierCurve.bind(this);
        this.handleAddEllipseCurve = this.handleAddEllipseCurve.bind(this);

        this.handleAddPointMark = this.handleAddPointMark.bind(this);

        this.handleAddSprite = this.handleAddSprite.bind(this);
    }

    render() {
        return <MenuItem title={_t('Object')}>
            <MenuItem title={_t('Group')}
                onClick={this.handleAddGroup}
            />
            <MenuItemSeparator />
            <MenuItem title={_t('Basic Geometry')}>
                <MenuItem title={_t('Plane')}
                    onClick={this.handleAddPlane}
                />
                <MenuItem title={_t('Box')}
                    onClick={this.handleAddBox}
                />
                <MenuItem title={_t('Circle')}
                    onClick={this.handleAddCircle}
                />
                <MenuItem title={_t('Cylinder')}
                    onClick={this.handleAddCylinder}
                />
                <MenuItem title={_t('Sphere')}
                    onClick={this.handleAddSphere}
                />
                <MenuItem title={_t('Icosahedron')}
                    onClick={this.handleAddIcosahedron}
                />
                <MenuItem title={_t('Torus')}
                    onClick={this.handleAddTorus}
                />
                <MenuItem title={_t('Torus Knot')}
                    onClick={this.handleAddTorusKnot}
                />
                <MenuItem title={_t('Teapot')}
                    onClick={this.handleAddTeaport}
                />
                <MenuItem title={_t('Lathe')}
                    onClick={this.handleAddLathe}
                />
            </MenuItem>
            <MenuItem title={_t('Text')}>
                <MenuItem title={_t('Unscaled Text')}
                    onClick={this.handleAddUnscaledText}
                />
                <MenuItem title={_t('3D Text')}
                    onClick={this.handleAdd3DText}
                />
            </MenuItem>
            <MenuItem title={_t('Curve')}>
                <MenuItem title={_t('Line Curve')}
                    onClick={this.handleAddLineCurve}
                />
                <MenuItem title={_t('CatmullRom Curve')}
                    onClick={this.handleAddCatmullRomCurve}
                />
                <MenuItem title={_t('QuadraticBezier Curve')}
                    onClick={this.handleAddQuadraticBezierCurve}
                />
                <MenuItem title={_t('CubicBezier Curve')}
                    onClick={this.handleAddCubicBezierCurve}
                />
                <MenuItem title={_t('Ellipse Curve')}
                    onClick={this.handleAddEllipseCurve}
                />
            </MenuItem>
            <MenuItem title={_t('Mark')}>
                <MenuItem title={_t('Point Mark')}
                    onClick={this.handleAddPointMark}
                />
            </MenuItem>
            <MenuItemSeparator />
            <MenuItem title={_t('Sprite')}
                onClick={this.handleAddSprite}
            />
        </MenuItem>;
    }

    // ------------------------- 组 ---------------------------------

    handleAddGroup() {
        app.editor.execute(new AddObjectCommand(new Group()));
    }

    // ------------------------- 平板 -------------------------------

    handleAddPlane() {
        app.editor.execute(new AddObjectCommand(new Plane()));
    }

    // ------------------------ 正方体 -----------------------------

    handleAddBox() {
        app.editor.execute(new AddObjectCommand(new Box()));
    }

    // ------------------------ 圆 ----------------------------------

    handleAddCircle() {
        app.editor.execute(new AddObjectCommand(new Circle()));
    }

    // ------------------------圆柱体 -------------------------------

    handleAddCylinder() {
        app.editor.execute(new AddObjectCommand(new Cylinder()));
    }

    // ------------------------ 球体 -------------------------------

    handleAddSphere() {
        app.editor.execute(new AddObjectCommand(new Sphere()));
    }

    // ----------------------- 二十面体 -----------------------------

    handleAddIcosahedron() {
        app.editor.execute(new AddObjectCommand(new Icosahedron()));
    }

    // ----------------------- 轮胎 ---------------------------------

    handleAddTorus() {
        app.editor.execute(new AddObjectCommand(new Torus()));
    }

    // ----------------------- 纽结 ---------------------------------

    handleAddTorusKnot() {
        app.editor.execute(new AddObjectCommand(new TorusKnot()));
    }

    // ---------------------- 茶壶 ----------------------------------

    handleAddTeaport() {
        app.editor.execute(new AddObjectCommand(new Teapot()));
    }

    // ---------------------- 酒杯 ----------------------------------

    handleAddLathe() {
        app.editor.execute(new AddObjectCommand(new Lathe()));
    }

    // ---------------------- 不缩放文字 ----------------------------------

    handleAddUnscaledText() {
        app.prompt({
            title: _t('Please input'),
            value: _t('Some Words'),
            onOK: (value) => {
                app.editor.execute(new AddObjectCommand(new UnscaledText(value, {
                    domWidth: app.editor.renderer.domElement.width,
                    domHeight: app.editor.renderer.domElement.height
                })));
            }
        });
    }

    // ---------------------- 3D文字 ---------------------------------------

    handleAdd3DText() {
        let win = app.createElement(Add3DTextWindow);
        app.addElement(win);
    }

    // ---------------------- 线段 ----------------------------------

    handleAddLineCurve() {
        var line = new LineCurve();
        app.editor.execute(new AddObjectCommand(line));
    }

    // ---------------------- CatmullRom曲线 ----------------------------------

    handleAddCatmullRomCurve() {
        var line = new CatmullRomCurve();
        app.editor.execute(new AddObjectCommand(line));
    }

    // ----------------------- 二次贝塞尔曲线 ---------------------------------

    handleAddQuadraticBezierCurve() {
        var line = new QuadraticBezierCurve();
        app.editor.execute(new AddObjectCommand(line));
    }

    // ----------------------- 三次贝塞尔曲线 ---------------------------------

    handleAddCubicBezierCurve() {
        var line = new CubicBezierCurve();
        app.editor.execute(new AddObjectCommand(line));
    }

    // --------------------- 椭圆曲线 ------------------------------------------

    handleAddEllipseCurve() {
        var line = new EllipseCurve();
        app.editor.execute(new AddObjectCommand(line));
    }

    // -------------------- 点状标注 --------------------------------------------

    handleAddPointMark() {
        if (this.pointMarkTool === undefined) {
            this.pointMarkTool = new PointMarkTool();
            this.pointMarkTool.on(`end`, () => {
                this.setState({
                    isAddPointMark: false
                });
            });
        }
        this.pointMarkTool.start();
        this.setState({
            isAddPointMark: true
        });
    }

    // ---------------------- 精灵 -----------------------------------

    handleAddSprite() {
        app.editor.execute(new AddObjectCommand(new Sprite()));
    }
}

export default ObjectMenu;