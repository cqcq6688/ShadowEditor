import PlayerComponent from '../component/PlayerComponent';
import Ease from '../../animation/Ease';

/**
 * 粒子动画控制器
 * @param {*} app 应用
 */
function ParticleAnimator(app) {
    PlayerComponent.call(this, app);
}

ParticleAnimator.prototype = Object.create(PlayerComponent.prototype);
ParticleAnimator.prototype.constructor = ParticleAnimator;

ParticleAnimator.prototype.create = function (scene, camera, renderer) {
    this.scene = scene;
};

ParticleAnimator.prototype.update = function (clock, deltaTime, time) {
    this.scene.children.forEach(n => {
        if (n.userData.type === 'Fire') {
            var elapsed = clock.getElapsedTime();
            n.userData.fire.update(elapsed);
        } else if (n.userData.type === 'Smoke') {

        } if (n.userData.type === 'ParticleEmitter') {
            n.userData.group.tick(deltaTime);
        }
    });
};

ParticleAnimator.prototype.dispose = function () {
    this.scene = null;
};

export default ParticleAnimator;