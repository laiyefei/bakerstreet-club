//init js for website set what i want
'use strict';
;define(function(){

  //we can do init from here still custom
  require.config({
    paths : {

        //react
        'babel' : ['plugins/browser.min'],
        'rt' : ['base/react-15.3.1.min'],
        'rt-dom' : ['base-plugins/rt-dom-15.3.1.min'],
        'rt-addons' : ['base-plugins/rt-with-addons-0.13.3'],
        //jsx assign
        'jsx-assign' : ['biz/jsx-assign'],

        //jquery
        'jq' : ['base/jquery-3.0.0.min', 'https://code.jquery.com/jquery-3.0.0.min.js'],

        //rq plugins
        'rq-domReady' : ['base-plugins/rq-domReady-2.0.1'],
		    'rq-css' : ['base-plugins/rq-css.min'],

        //rq jsx need
        'rq-jsx' : ['base-plugins/rq-jsx'],
        'rq-text' : ['base-plugins/rq-text-2.0.13'],
        'rq-JSXTransformer' : ['base-plugins/rq-JSXTransformer-0.13.3']

    },
    shim : {
        // 'rt': {
        //   exports: 'React'
        // },
        // 'rq-jsx' : {
        //     deps : ['JSXTransformer', 'text']
        // },
        'init': {
            deps : ['rq-domReady']
        },
        'jq' : {
            exports : '$'
        }
	},
    jsx : {
        fileExtension : '.jsx',
        harmony : true,
        stripTypes: true
    }
    // 'config' : {
    //   'babel' : {
    //     'sourceMaps' : "inline", // One of [false, 'inline', 'both']. See https://babeljs.io/docs/usage/options/
    //     'fileExtension' : ".jsx" // Can be set to anything, like .es6 or .js. Defaults to .jsx
    //   }
    // }
  });
    //load success do =============================================================================
    //requre  to init
    require(['init']);


});
