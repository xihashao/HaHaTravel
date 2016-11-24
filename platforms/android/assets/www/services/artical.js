'use strict';
angular.module('myApp.services')
    .factory('Artical',function(ENV,$resource,$rootScope,$log,$http, $q,Storage){
        //查询商家列表
        //var getActivitys = function() {
        //    var serveurl = ENV.api+"/article_list2.json";
        //    //$http()返回一个promise对象
        //    return $http({
        //        method:'GET',
        //        url:serveurl,
        //        params:{
        //            //type为4获取活动
        //            type:4
        //        }
        //    });
        //};

        //用来存储 是否有下一页  下一页的页数  获取的数据
        var  allBusiness={};
        //查询某个旅游类商家详情
        var getTravel_details = function(id,ulong,ulat){
            var serveurl = ENV.api+'/showItems.do';
            return $http({
                method:'GET',
                url:serveurl,
                //这个键的值是一个字符串map或对象，会被转换成查询字符串追加在URL后面。如果值不是字符串，会被JSON序列化。
                params:{
                    articleId:id,
                    ulong:ulong,
                    ulat:ulat
                }
            });
        };

        //查询所有商家列表,根据channelId去判断具体是哪一类
        var getTravel_list=function(page,channelId){
            var serveurl = ENV.api+'/article_listAll.json';
            return $http({
                method:'GET',
                url:serveurl,
                //这个键的值是一个字符串map或对象，会被转换成查询字符串追加在URL后面。如果值不是字符串，会被JSON序列化。
                params:{
                    channelId:channelId,// 栏目的id
                    page:page
                }
            });
        };
        //提交评论
        var commitReview=function(content,star,articleId){
            var serveurl = ENV.api+'/comment_puts.json';
            return $http({
                method:'GET',
                url:serveurl,
                //这个键的值是一个字符串map或对象，会被转换成查询字符串追加在URL后面。如果值不是字符串，会被JSON序列化。
                params:{
                    content:content,// 旅游栏目的id
                    star:star,
                    articleId:articleId

                }
            });
        };
      //获取评论
        var getReview=function(id,page){
            var serverurl= ENV.api+'/comment_lists.json';
            return $http({
              method:"GET",
              url:serverurl,
              params:{
                id:id,
                page:page
              }

            });
        };


        return {
            //获取商家具体信息
            getTravel_details:function(id,ulong,ulat){
                var d = $q.defer();
                var promise = d.promise;
                //获取旅游类产品的详细信息
                getTravel_details(id,ulong,ulat).then(function(response){
                $log.debug('getTravel_details response:',response);
                    //alert("获取文章成功");
                    d.resolve(response);
                },function(err){
                    //alert("获取文章失败");
                    d.reject("获取文章失败");
                });
                return promise;
            },
            //获取商家列表list
            getTravel_list:function(page,channelId){
                var d = $q.defer();
                var promise = d.promise;
                //获取旅游类产品的详细信息
                getTravel_list(page,channelId).then(function(response){

                    if(response.status==200) {
                        $log.debug('getTravel_list response:', response);
                        //alert("获取文章列表成功");
                        d.resolve(response.data);
                    }
                    else{
                        d.reject("获取文章列表失败!");
                    }
                },function(err){
                    // alert("获取文章列表失败!");
                    d.reject(err);
                });
                return promise;
            },
            　//根据好评排序  旅游的文章
            getTravelListByReview:function(page,channelId){
                var d = $q.defer();
                var promise = d.promise;
                var serveurl = ENV.api + '/article_listAll.json';
                $http({
                    method:'GET',
                    url:serveurl,
                    //这个键的值是一个字符串map或对象，会被转换成查询字符串追加在URL后面。如果值不是字符串，会被JSON序列化。
                    params:{
                        channelId:channelId,// 旅游栏目的id
                        page:page,
                        isStar:1
                    }
                }).then(function(response){
                    if(response.status==200) {
                        $log.debug('getTravel_list response:', response);
                        //alert("获取文章列表成功");
                        d.resolve(response.data);
                    }
                    else{
                        d.reject("获取文章列表失败");
                    }
                },function(err){
                    alert("获取文章列表失败");
                    d.reject(err);
                })
                return promise;
            },

              //根据价格从低到高排序
            getTravelListByPriceUp:function(page,channelId){
                var d = $q.defer();
                var promise = d.promise;
                var serveurl = ENV.api + '/article_listAll.json';
                $http({
                    method:'GET',
                    url:serveurl,
                    //这个键的值是一个字符串map或对象，会被转换成查询字符串追加在URL后面。如果值不是字符串，会被JSON序列化。
                    params:{
                        channelId:channelId,// 旅游栏目的id
                        page:page,
                        isPriceDown:0
                    }
                }).then(function(response){
                    if(response.status==200) {
                        $log.debug('getTravel_list response:', response);
                        //alert("获取文章列表成功");
                        d.resolve(response.data);
                    }
                    else{
                        d.reject("获取文章列表失败");
                    }
                },function(err){
                    alert("获取文章列表失败");
                    d.reject(err);
                })
                return promise;
            },
              //根据价格从高到低排序
            getTravelListByPriceDown:function(page,channelId){
                var d = $q.defer();
                var promise = d.promise;
                var serveurl = ENV.api + '/article_listAll.json';
                $http({
                    method:'GET',
                    url:serveurl,
                    //这个键的值是一个字符串map或对象，会被转换成查询字符串追加在URL后面。如果值不是字符串，会被JSON序列化。
                    params:{
                        channelId:channelId,// 旅游栏目的id
                        page:page,
                        isPriceDown:1
                    }
                }).then(function(response){
                    if(response.status==200) {
                        $log.debug('getTravel_list response:', response);
                        //alert("获取文章列表成功");
                        d.resolve(response.data);
                    }
                    else{
                        d.reject("获取文章列表失败");
                    }
                },function(err){
                    alert("获取文章列表失败");
                    d.reject(err);
                })
                return promise;
            },
              //根据人气排序
            getTravelListByPriceHot:function(page,channelId){
                var d = $q.defer();
                var promise = d.promise;
                var serveurl = ENV.api + '/article_listAll.json';
                $http({
                    method:'GET',
                    url:serveurl,
                    //这个键的值是一个字符串map或对象，会被转换成查询字符串追加在URL后面。如果值不是字符串，会被JSON序列化。
                    params:{
                        channelId:channelId,// 旅游栏目的id
                        page:page,
                        isQuantity:1
                    }
                }).then(function(response){
                    if(response.status==200) {
                        $log.debug('getTravel_list response:', response);
                        //alert("获取文章列表成功");
                        d.resolve(response.data);
                    }
                    else{
                        d.reject("获取文章列表失败");
                    }
                },function(err){
                    alert("获取文章列表失败");
                    d.reject(err);
                })
                return promise;
            },
              //智能排序（默认）

            //提交评论
            commitReview:function(content,star,articleId){
                var d = $q.defer();
                var promise = d.promise;
                commitReview(content,star,articleId).then(function(response){
                    d.resolve(response.data);
                    $log.debug(' response:', response.data);
                },function(err){
                    alert("提交评论失败");
                    d.reject(err);

                })
                return promise;
            },
          //获取评论
            getReview:function(id,page){
              var d=$q.defer();
              var promise=d.promise;
              getReview(id,page).then(function(response){

                d.resolve(response.data);
                $log.debug(' response:', response.data);
              },function(err){
                alert("获取评论失败！");
                d.reject(err);

              })

              return promise;
            },

          //获取所有商家(第一页)
          getAllBusinessOne:function(){
            var d = $q.defer();
            var promise = d.promise;
            var serveurl = ENV.api + '/article_listAll.json';
            $http({
              method:'GET',
              url:serveurl,
              //这个键的值是一个字符串map或对象，会被转换成查询字符串追加在URL后面。如果值不是字符串，会被JSON序列化。
              params:{
                isStar:1, //默认按照好评来排序
                page:1      //第一页
              }
            }).then(function(response){
              var hasNext=true;
              if(response.status==200) {
                $log.debug('获得的所有文章第一页数据:', response);
                if(response.data.length<=20){
                    hasNext=false;
                }
                allBusiness={                   //存储信息
                  'hasNext':hasNext,
                  'businessDate':response.data,
                  'nextPage':2
                }
                $rootScope.$broadcast("scroll.refreshComplete");
                $rootScope.$broadcast("allBusiness.businessUpdated");
                console.log("获取完第一页之后的allBusiness数据为："+allBusiness.hasNext);

                d.resolve(response.data);
              }
              else{
                d.reject("获取文章列表失败");
              }
            },function(err){
              alert("获取文章列表失败");
              d.reject(err);
            })
            return promise;
          },
          // //获取数据
          // getBusiness: function() {
          //   if (allBusienss=== undefined) {
          //     return false;
          //   }
          //   return allBusienss.businessDate;
          // },
          getMoreBusiness:function(){
            var nextPage = allBusiness.nextPage;         //下一页的页数
            var hasNext = allBusiness.hasNext;         //是否还有下一页
            var portalsData = allBusiness.businessDate;      //下一页数据

            var d = $q.defer();
            var promise = d.promise;
            var serveurl = ENV.api + '/article_listAll.json';
            $http({
              method:'GET',
              url:serveurl,
              //这个键的值是一个字符串map或对象，会被转换成查询字符串追加在URL后面。如果值不是字符串，会被JSON序列化。
              params:{
                isStar:1, //默认按照好评来排序
                page:nextPage     //下一页
              }
            }).then(function(response){
              if(response.status==200) {
                $log.debug('获得的所有文章下一页的数据:', response);
                portalsData=portalsData.concat(response.data);
                console.log("第二页以及第二页之后的商家数据为："+portalsData);

                if(response.data.length<20){

                  hasNext=false;
                }
                allBusiness={                   //存储信息
                  'hasNext':hasNext,
                  'businessDate':portalsData,
                  'nextPage':nextPage++
                }

                d.resolve(response.data);
              }
              else{
                d.reject("获取文章列表失败");
              }
            },function(err){
              alert("获取文章列表失败");
              d.reject(err);
            })
            return promise;
          },
          //去的所有商家对象的数据
          getPortals: function() {
           return allBusiness.businessDate;
          },

          //是否还有下一页
          isHasNext: function(){
            if(allBusiness === undefined){
              return false;
            }
            return allBusiness.hasNext;
          }
        }


    });
