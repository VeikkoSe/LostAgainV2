describe('Testing testing core', function() {
    it('constructor with no values failing', function() {

        var CORE = core();
        //expect(CORE.getResolutionHeight()).toThrow(new Error());
        //expect(CORE.getResolutionWidth()).toThrow(new Error());
    });

    it('onlyoneparameter failing', function() {

        var w = 1024;

        var CORE = core(w);
        //toThrow needs to be inside anymous function
        expect(function(){
            CORE.getResolutionHeight();
        }).toThrow();

    });


    it('both numbers present, we succeed', function() {

        var w = 1024;
        var h = 768;

        var CORE = core(w,h);

        expect(CORE.getResolutionWidth()).toEqual(jasmine.any(Number));
        expect(CORE.getResolutionHeight()).toEqual(jasmine.any(Number));

    });


    it('string width', function() {

        var w = 'string';
        var CORE = core(w);

        expect(function(){
            CORE.getResolutionWidth();
        }).toThrow();
    });

    it('string height', function() {

        var w = 128;
        var h = 'string';
        var CORE = core(w,h);

        expect(function(){
            CORE.getResolutionHeight();
        }).toThrow();
    });




});