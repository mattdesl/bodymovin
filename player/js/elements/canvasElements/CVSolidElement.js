function CVSolidElement(data, comp,globalData){
    this._parent.constructor.call(this,data, comp,globalData);
}
createElement(CVBaseElement, CVSolidElement);

CVSolidElement.prototype.renderFrame = function(parentMatrix){
    if(this._parent.renderFrame.call(this, parentMatrix)===false){
        return;
    }
    var ctx = this.canvasContext;
    this.globalData.renderer.save();
    this.globalData.renderer.ctxTransform(this.finalTransform.mat.props);

    var color = this.data.sc;
    var opacity = this.finalTransform.opacity;
    if (this.effects && this.effects.effectElements && this.effects.effectElements[0]) {
        const efGroup = this.effects.effectElements[0];
        if (efGroup.effectElements.length >= 3) {
            var rgb = efGroup.effectElements[2].p.v;
            color = 'rgb('+bm_floor(rgb[0]*255)+','+bm_floor(rgb[1]*255)+','+bm_floor(rgb[2]*255)+')';
        }
        if (efGroup.effectElements.length >= 7) {
            var alpha = efGroup.effectElements[6].p.v;
            opacity *= alpha;
        }
    }

    this.globalData.renderer.ctxOpacity(opacity);
    ctx.fillStyle=color;
    ctx.fillRect(0,0,this.data.sw,this.data.sh);
    this.globalData.renderer.restore(this.data.hasMask);
    if(this.firstFrame){
        this.firstFrame = false;
    }
};