
var Test4Layer = cc.Layer.extend({
    sprite:null,
    isFlipX:true,
    isFlipY:true,
    ctor:function () {

        this._super();
        var size = cc.winSize;

        this.sprite =new cc.Sprite(res.s1b_png);
        this.sprite.attr({
            x:size.width/2,
            y:size.height/2
        });
        this.addChild(this.sprite);

        //人稱做動畫＝action1
        var act1 = new cc.MenuItemImage(
            res.btn_png,null,null,
            function(){
                this.isFlipX = !this.isFlipX;
                this.sprite.runAction(cc.flipX(this.isFlipX));
            },this);
        act1.x =100;
        act1.y =600;

        //人稱做動畫＝action2
        var act2 = new cc.MenuItemImage(
            res.btn_png,null,null,
            function(){
                this.isFlipY = !this.isFlipY;
                this.sprite.runAction(cc.flipY(this.isFlipY));
            },this);
        act2.x =160;
        act2.y =600;

        //人稱做動畫＝action3加絕對位置移動
        var act3 = new cc.MenuItemImage(
            res.btn_png,null,null,
            function(){
                this.sprite.runAction(
                    cc.moveTo(2, cc.p(800,500)));
            },this);
        act3.x =220;
        act3.y =600;

        //人稱做動畫＝action4加相對位置移動
        var act4 = new cc.MenuItemImage(
            res.btn_png,null,null,
            function(){
                this.sprite.runAction(
                    cc.moveBy(1, cc.p(-40,-40)));
            },this);
        act4.x =280;
        act4.y =600;

        //人稱做動畫＝action5加連續動作＝一個接一個
        var act5 = new cc.MenuItemImage(
            res.btn_png,null,null,
            function(){
                var a1 = cc.moveBy(0.5, cc.p(size.width/2,0));
                var a2 = cc.moveBy(0.5, cc.p(0,size.height/2));
                var a3 = cc.moveBy(0.5, cc.p(-size.width/2,0));
                var a4 = cc.moveBy(0.5, cc.p(0,-size.width/2));
                var c1 = new cc.CallFunc(this.cb1 ,this);
                var as =[];
                as.push(a1);
                as.push(c1);
                as.push(a2);
                as.push(c1);
                as.push(a3);
                as.push(c1);
                as.push(a4);
                as.push(c1);
                var seq = new cc.Sequence(as);
                this.sprite.runAction(seq);
            },this);
        act5.x =340;
        act5.y =600;

        var menu = new cc.Menu(act1, act2, act3, act4, act5);
        menu.x =0;
        menu.y =0;
        this.addChild(menu);

        return true;
    },
    cb1:function(){
        cc.log('here');
    }
});

var Test4Scene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new Test4Layer();
        this.addChild(layer);
    }
});

