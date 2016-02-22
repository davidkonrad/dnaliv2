'use strict';

angular.module('dnalivApp')
 .directive('stRatio',function(){
          return {
			require: '^stTable',
            link:function(scope, element, attr){
              var ratio=+(attr.stRatio);
            
              element.css('width',ratio+'%');
            
            }
          };
      });