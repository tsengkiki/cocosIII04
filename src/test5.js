
var Test5Layer = cc.Layer.extend({
    sprite:null,
    ctor:function () {

        this._super();
        var size = cc.winSize;
        //
        cc.spriteFrameCache.addSpriteFrames(res.s1_plist, res.s1_png);

        var arrayAnimFrams = [];
        for (var i=1; i<=25; i++){
            var imgname= 's1_00'+(i<10?'0'+i:i)+'.png';
            var frame = cc.spriteFrameCache.getSpriteFrame(imgname);
            arrayAnimFrams.push(frame);
        }

        var fTime= 1/16;
        var animation= new cc.Animation(arrayAnimFrams, fTime);
        var animate = new cc.Animate(animation);

        this.sprite = new cc.Sprite(arrayAnimFrams[0]);
        this.sprite.attr({
            x:size.width/2,
            y:size.height/2
        });
        this.addChild(this.sprite);

        this.sprite.runAction(cc.repeatForever(animate));


        return true;

    }
});

var Test5Scene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new Test5Layer();
        this.addChild(layer);
    }
});

