/**
 * Created by xihashao-pc on 2016/6/7.
 */
'use strict';
angular.module('myApp.services')
    .factory('Homepage',function(ENV,$resource, $rootScope,$log,$http, $q,Storage){

    //首页获取三大类推荐H
    var getRecommend= function(id,ulong,ulat){
        var serveurl = ENV.api+'/article_gather_get.json';
        return $http({
            method:'GET',
            url:serveurl,
            //这个键的值是一个字符串map或对象，会被转换成查询字符串追加在URL后面。如果值不是字符串，会被JSON序列化。
            params:{
                id:id,
                ulong:ulong,
                ulat:ulat
            }
        });
        };
      //根据商家名字进行搜索
      var findByName=function(name){
        var serveurl = ENV.api+'/article_get_byTitle.json';
        return $http({
          method:'GET',
          url:serveurl,
          //这个键的值是一个字符串map或对象，会被转换成查询字符串追加在URL后面。如果值不是字符串，会被JSON序列化。
          params:{
            title:name
            }
        })

      };
    return{
        getRecommend:function(id,ulong,ulat){
            var d = $q.defer();
            var promise = d.promise;
            getRecommend(id,ulong,ulat).then(function(response){
                console.log("获取推荐的结果：",response);

                d.resolve(response.data);
            },function(err){
                d.reject("获取推荐失败");
            });
            return promise;
        },
        findByName:function(name){
            var d = $q.defer();
            var promise = d.promise;
            findByName(name).then(function(response){
              console.log("搜索的结果是：",response);

              d.resolve(response.data);
            },function(err){
              d.reject("搜索失败！");
            });
            return promise;
        }
    }

    })
