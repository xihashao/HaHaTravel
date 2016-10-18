'use strict';
angular.module('myApp.services')
    .factory('User',function(ENV,$resource, $rootScope,$log,$http, $q,Storage){

        var storageKey ='user';
        var user = Storage.get(storageKey) || {};

        return {
            //登录
            login: function (inputUser) {
                var $this = this;
                var d = $q.defer();
                var promise = d.promise;
                var serveurl = ENV.api + '/user_login.do';
                $http({
                    method: 'POST',
                    url: serveurl,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    data: inputUser,
                    transformRequest: function (obj) {
                        console.info(obj);
                        var str = [];
                        for (var p in obj) {
                            str.push(p + "=" + obj[p]);
                        }
                        var serialString = str.join("&");
                        console.info(serialString);
                        return serialString;
                    }

                }).then(function (response) {
                    console.log('login response:', response);
                    var data = response.data;
                    if (data.result == 'success') {
                        alert("成功啦");
                       //将登录成功后用户的信息放入storage
                        user.account=inputUser.account;
                        user.password=inputUser.password;
                        user.nickname=data.nickName;
                        user.state='true';

                        Storage.set(storageKey,user);
                        d.resolve(user);


                    } else {
                        console.log("dsfsdf");
                        d.reject('用户名或密码错误！');
                    }
                }, function (err) {
                    console.log('login error:', err);
                    d.reject('网络错误');
                });
                return promise;

                     },
            //通过帐号获取用户信息
            getUserInfo:function(account){
                var d = $q.defer();
                var promise = d.promise;
                var serveurl = ENV.api+'/user_find.json';
                $http({
                    method:'GET',
                    url:serveurl,
                    params:{
                        key:account
                    }
                }).then(function(response){
                    console.log('getUserInfo response',response);
                    var data = response.data[0];
                    if(data){
                        d.resolve(data);
                    }else{
                        d.reject('查询个人信息失败');
                    }


                },function(err){
                    d.reject('网络错误');
                });
                return promise;
            },
            //推出登录
            logout: function() {
                var d = $q.defer();
                var promise = d.promise;
                var serveurl = ENV.api+'/user_logout.json';
                $http({
                    method:'GET',
                    url:serveurl
                }).then(function(response){
                    console.log('response',response);
                    var data = response.data;

                    d.resolve(data);
                    user = {};
                    Storage.remove(storageKey);




                },function(err){
                    d.reject('网络错误');
                });
                return promise;


            },
            //注册
            sigin:function(user){
                var d = $q.defer();
                var promise = d.promise;

                var serveurl = ENV.api+'/user_add.json';
                $http({
                    method:'POST',
                    url:serveurl,
                    headers:{'Content-Type':'application/x-www-form-urlencoded'},
                    data:user,
                    //这是一个函数或函数数组，用来对HTTP请求的请求体和头信息进行转换，并返回转换后的版本。通常用于在请求发送给服务器之前对其进行序列化。
                    //function(data,headers)参数就是上面的data和headers，我下面写的函数就是把data序列化为字符串
                    transformRequest:function(obj){
                        console.info(obj);
                        var str = [];
                        for(var p in obj){
                            str.push(encodeURIComponent(p)+"="+encodeURIComponent(obj[p]));
                        }
                        var serialString = str.join("&");
                        console.info(serialString);
                        return serialString;
                    }

                }).then(function(response){
                    $log.debug('response',response);

                        d.resolve(response);

                },function(err){
                    console.log('service里边login error:', err);
                    d.reject('网络错误');
                });
                return promise;
            },
            //注册发送邮箱验证码
            getCode:function(account){
                var d = $q.defer();
                var promise = d.promise;
                var user={};
                user.account=account;
                var serveurl = ENV.api+'/getConfirmCode.do';
                $http({
                    method:'post',
                    url:serveurl,
                    headers:{'Content-Type':'application/x-www-form-urlencoded'},
                    data:user,
                    //这是一个函数或函数数组，用来对HTTP请求的请求体和头信息进行转换，并返回转换后的版本。通常用于在请求发送给服务器之前对其进行序列化。
                    //function(data,headers)参数就是上面的data和headers，我下面写的函数就是把data序列化为字符串
                    transformRequest:function(obj){
                        console.info(obj);
                        var str = [];
                        for(var p in obj){
                            str.push(encodeURIComponent(p)+"="+encodeURIComponent(obj[p]));
                        }
                        var serialString = str.join("&");
                        console.info(serialString);
                        return serialString;
                    }
                }).then(function(response){
                    $log.debug('response',response);
                    console.log("response的信息：",response);
                    var data = response.data;
                    if(data.result =='success'){
                    d.resolve(data);
                    }else d.reject(data.msg);
                },function(err){
                    d.reject('网络错误');
                });
                return promise;
            },
            //重置密码
            resetPassword:function(user){
                var d = $q.defer();
                var promise = d.promise;

                var serveurl = ENV.api+'/user_reset_password.json';
                $http({
                    method:'POST',
                    url:serveurl,
                    headers:{'Content-Type':'application/x-www-form-urlencoded'},
                    data:user,
                    //这是一个函数或函数数组，用来对HTTP请求的请求体和头信息进行转换，并返回转换后的版本。通常用于在请求发送给服务器之前对其进行序列化。
                    //function(data,headers)参数就是上面的data和headers，我下面写的函数就是把data序列化为字符串
                    transformRequest:function(obj){
                        console.info(obj);
                        var str = [];
                        for(var p in obj){
                            str.push(encodeURIComponent(p)+"="+encodeURIComponent(obj[p]));
                        }
                        var serialString = str.join("&");
                        console.info(serialString);
                        return serialString;
                    }

                }).then(function(response){
                    $log.debug('resetPassword response',response);
                    var data = response.data;
                    if(data.retCode == 0){
                        d.resolve(data);
                    }else d.reject(data.message);

                    d.resolve(data);
                },function(err){
                    d.reject('网络错误');
                });
                return promise;
            },
            //取得当前用户
            getCurrentUser: function() {
                $log.debug('current user:', user);
                return user;
            }

                }
    });