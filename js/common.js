$(function(){
    // create controller
    var controller = new ScrollMagic.Controller();

    // create tween
    var tween01 = new TimelineMax ()
        .add([
            TweenMax.to("#parallaxContainer .layer1", 1, {backgroundPosition: "-40% 0", ease: Linear.easeNone}),
            TweenMax.to("#parallaxContainer .layer2", 1, {backgroundPosition: "-500% 0", ease: Linear.easeNone}),
            TweenMax.to("#parallaxContainer .layer3", 1, {backgroundPosition: "-225% 0", ease: Linear.easeNone})
        ]);

    // build scene
    var scene01 = new ScrollMagic.Scene({triggerElement: "#parallaxContainer", duration: 2000, offset: 0, triggerHook: 0.2})
        .setTween(tween01)
        .setPin("#parallaxContainer")
        .addIndicators({
            name: "1"
        })
        .addTo(controller);

    // define images
    var images = [
        "./img/example_imagesequence_01.png",
        "./img/example_imagesequence_02.png",
        "./img/example_imagesequence_03.png",
        "./img/example_imagesequence_04.png",
        "./img/example_imagesequence_05.png",
        "./img/example_imagesequence_06.png",
        "./img/example_imagesequence_07.png"
    ];

    // TweenMax can tween any property of any object. We use this object to cycle through the array
    var obj = {curImg: 0};

    // create tween
    var tween02 = TweenMax.to(obj, 0.5,
        {
            curImg: images.length - 1,	// animate propery curImg to number of images
            roundProps: "curImg",				// only integers so it can be used as an array index
            repeat: 3,									// repeat 3 times
            immediateRender: true,			// load first image automatically
            ease: Linear.easeNone,			// show every image the same ammount of time
            onUpdate: function () {
              $("#myimg").attr("src", images[obj.curImg]); // set the image source
            }
        }
    );

    // build scene
    var scene02 = new ScrollMagic.Scene({triggerElement: "#imagesequence", duration: 3000, triggerHook:0.4})
        .setTween(tween02)
        .setPin("#imagesequence")
        .addIndicators({
            name:"2"
        })
        .addTo(controller);

    // create tween
    var tween03 = new TimelineMax();
    tween03.fromTo(".bg", 1, {opacity:0}, {opacity:1});
    tween03.fromTo(".bd01", 1, {left:"-100%"}, {left:"10%"});
    tween03.fromTo(".bd02", 1, {right:"-100%"}, {right:"10%"});
    tween03.fromTo(".road", 2, {left:"100%"}, {left:0});
    tween03.fromTo(".car", 2, {right:"100%"}, {right:0});

    // build scene
    var scene03 = new ScrollMagic.Scene({triggerElement: "#scene03", duration: 5000, triggerHook:0})
        .setTween(tween03)
        .setPin("#scene03")
        .addIndicators({
            name:"3"
        })
        .addTo(controller);

    function pathPrepare ($el) {
        var lineLength = $el[0].getTotalLength();
        $el.css("stroke-dasharray", lineLength);
        $el.css("stroke-dashoffset", lineLength);
    }

    var $word = $("path#word");
    var $dot = $("path#dot");

    // prepare SVG
    pathPrepare($word);
    pathPrepare($dot);

    // build tween
    var tween04 = new TimelineMax()
        .add(TweenMax.to($word, 0.9, {strokeDashoffset: 0, ease:Linear.easeNone})) // draw word for 0.9
        .add(TweenMax.to($dot, 0.1, {strokeDashoffset: 0, ease:Linear.easeNone}))  // draw dot for 0.1
        .add(TweenMax.to("path", 1, {stroke: "#33629c", ease:Linear.easeNone}), 0);			// change color during the whole thing

    // build scene
    var scene04 = new ScrollMagic.Scene({triggerElement: "#svgDraw", duration: 1000, tweenChanges: true, triggerHook:0.2})
        .setTween(tween04)
        .setPin("#svgDraw")
        .addIndicators({
            name:"4"
        })
        .addTo(controller);

    var wipeAnimation = new TimelineMax()
        .fromTo(".panel.red", 1, {x: "-100%"}, {x: "0%", ease: Linear.easeNone})  // in from left
        .fromTo(".panel.yellow",    1, {x:  "100%"}, {x: "0%", ease: Linear.easeNone})  // in from right
        .fromTo(".panel.green", 1, {y: "-100%"}, {y: "0%", ease: Linear.easeNone}); // in from top

    // create scene to pin and link animation
    new ScrollMagic.Scene({
            triggerElement: "#sectionWipe",
            triggerHook: "onLeave",
            duration: "300%"
        })
        .setPin("#sectionWipe")
        .setTween(wipeAnimation)
        .addIndicators({
            name:"5"
        }) // add indicators (requires plugin)
        .addTo(controller);
});

