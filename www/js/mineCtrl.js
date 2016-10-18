/**
 * Created by xihashao on 16/3/23.
 */
'use strict';
angular.module('myApp.controllers')
.controller('mineCtrl',function($scope,$ionicLoading, $ionicPopup,$ionicModal,$log,$timeout,$interval,$location,$rootScope,User,$ionicHistory,Storage){
    //$scope.ENV = ENV;
    //console.log("ENV");
        $rootScope.back=function(){
        $ionicHistory.goBack();
    };

    $scope.inputUser={};
    $scope.inputUser.password='';
    $scope.inputUser.account='';

    $scope.newUser={};
    $scope.currentUser =User.getCurrentUser();
    // $scope.order={number:1,weixin:false,yinlian:false,zhifubao:false};


    //显示的昵称
    $scope.user ={};
    //弹窗提醒
    $scope.showAlert = function(msg) {
        var alertPopup = $ionicPopup.alert({
            title: '提示信息',
            template: msg
        });
    };
    //登录
    $scope.login=function(){
        //$ionicLoading.show({template:'登录中...'});
        console.log("登录信息",$scope.inputUser);
        if(typeof($scope.inputUser)=='undefined'){
            $ionicLoading.show({template:'请输入正确的用户名和密码！',duration:2000});
            return false;
        }
        else{
        User.login($scope.inputUser).then(function(response){
            //$ionicLoading.show({template:'登录成功',duration:500});
            //$rootScope.$broadcast('loginSuccess');
            //$rootScope.account=$scope.inputUser.account;
            //每过60s获取一次
            $scope.currentUser =User.getCurrentUser();
            $scope.user.nickname = $scope.currentUser.nickname;
            $scope.user.state=  $scope.currentUser.state;

            $log.debug('before TimeTask');
            console.log("关闭MODAL");
            //loadMessages();
            //$rootScope.TimerTask = $interval(loadMessages,60000);
            $scope.closeLoginModal();//登录成功后就关闭登录MODAL
            console.log("当前用户：",User.getCurrentUser());
        },function(err){
            console.log("登录失败结果123：",err);

            $ionicLoading.show({template:err,duration:1200});
        });
        }
    };
    //点击登录跳出modal
    $ionicModal.fromTemplateUrl('userLogin.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modalLogin = modal;
    });
    //登录MODAL
    $scope.openLoginModal = function() {
        console.log("登陆");
        $scope.modalLogin.show();
//            $timeout(function () {
//                $scope.modal.hide();
//            }, 2000);
    };
    $scope.closeLoginModal=function(){
        $scope.modalLogin.hide();
    };
    //点击出册跳出MODAL
    $ionicModal.fromTemplateUrl('register.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modalRegister = modal;
    });


    //注册MODAL
    $scope.openRegisterModal = function() {
        console.log("注册");
        $scope.modalRegister.show();
//            $timeout(function () {
//                $scope.modal.hide();
//            }, 2000);
    };


    $scope.closeRegisterModal=function(){
        $scope.modalRegister.hide();
    };
    // Cleanup the modal when we're done with it
    $scope.$on('$destroy', function() {
        $scope.modalRegister.remove();
        $scope.modalLogin.remove();
    });

    $scope.regesterToMine=function(){
        $scope.closeLoginModal();
        $scope.closeRegisterModal();
        $location.path('/mine');
    };
    $scope.loginToMine=function(){
        $scope.closeLoginModal();

        $location.path('/mine');
    };

    //通过帐号获取用户信息：
    //点击发送邮箱验证码
    $scope.sendIdentifyCode=function(){
        User.getCode($scope.newUser.account).then(function(response){
            console.log("controller里边的response：",response);
            alert("验证码已发送至邮箱");
            $scope.newUser.validateCode=response.account;  //返回的验证码

        },function(err){
            console.log("controller里边的ERR:",err);
            console.log("发送邮箱验证失败");
            alert("系统错误，验证码发送失败");

        })
    };
    //注册
    $scope.addNewUser=function(){
        console.log("验证码为：",$scope.newUser.validateCode);
        console.log("输入的验证码为：",$scope.newUser.inputValidateCode);
        console.log("$scope.newUser.password:",$scope.newUser.password);

        //输入的验证码是否正确
        if($scope.newUser.inputValidateCode!=null) {
            if ($scope.newUser.inputValidateCode == $scope.newUser.validateCode) {
                //两次输入的密码是否一致
                if ($scope.newUser.password != null) {
                    if ($scope.newUser.password == $scope.newUser.confirmPassword) {
                        var newuser={};
                        newuser['account']=$scope.newUser.account;
                        newuser['password']=$scope.newUser.password;
                        newuser['nickname']=$scope.newUser.nickname;
                        newuser['siteId']=10;
                        User.sigin(newuser).then(function (response) {
                            console.log("controller里边的response：", response);
                            console.log("注册成功");
                            $scope.closeRegisterModal();
                            $scope.regesterToMine();
                            alert("注册成功");

                        }, function (err) {
                            alert("注册失败");
                        })
                    }

                    else {
                        alert("两次密码输入不一样");
                    }
                }
                else {
                    alert("请输入密码!")
                }
            }
            else {
                alert("验证码错误!");

            }
        }else{
            alert("请输入验证码!");
        }
    };

});

