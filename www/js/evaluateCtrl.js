/**
 * Created by xihashao on 16/3/23.
 */
//处理评论的controller,包括上传评论的图片
angular.module('myApp.controllers')
    .controller('evaluateCtrl',function($scope,$ionicHistory,$ionicLoading, $location,$ionicModal,$stateParams,$cordovaImagePicker,$ionicListDelegate,$ionicPopup,$log,$timeout,$stateParams,$interval,$rootScope,$ionicActionSheet,User,Artical,FileUtil) {
        $scope.evaluate={};
        $scope.evaluate.isEdit=false;
        $scope.evaluate.oneMark=false;
        $scope.evaluate.twoMark=false;
        $scope.evaluate.threeMark=false;
        $scope.evaluate.fourMark=false;
        $scope.evaluate.fiveMark=false;
        $scope.evaluate.content='';
        $scope.evaluate.star=0;
        $scope.evaluate.articleId=$stateParams.articleId;//待评价列表传过来的文章Id

        $scope.articleId=$stateParams.id; //文章详情点击查看全部评论传过来的文章id

      //放图片的数组
        $scope.images_list={};

        $scope.images_list.srcList = ['images/camera.png','images/add.png','images/add1.png'];
        $scope.images_list.num=3;

        $scope.isShow1=true;
        $scope.isShow2=true;
        $scope.isShow3=true;

        $scope.page=1;//默认请求都是从第一页开始

        $scope. isUpload=true;//标志图片是否上传成功
        $scope.ImageToShow={};

        //用户评价对象数组
        // $scope.evaluateItems=[{username:'xihashao',mark:4,evaluate:'这个地方还是很漂亮的哇！下次一还要来！',data:'2016-02-06',imageSrc1:'images/jingse1.jpg',imageSrc2:'images/jingse2.jpg',imageSrc3:'images/jingse3.jpg'},
        //                         {username:'杨志伟',mark:3,evaluate:'这个地方还是很漂亮的哇！下次一还要来！',data:'2016-02-06',imageSrc1:'images/jingse1.jpg',imageSrc2:'images/jingse2.jpg',imageSrc3:'images/jingse3.jpg'},
        //                         {username:'杨志伟',mark:3,evaluate:'这个地方还是很漂亮的哇！下次一还要来！',data:'2016-02-06',imageSrc1:'images/jingse1.jpg',imageSrc2:'images/jingse2.jpg',imageSrc3:'images/jingse3.jpg'}
        // ];

         $scope.evaluateItems=[];
        //文章的id

        $scope.isEdit=function(){
            $scope.evaluate.isEdit=!$scope.evaluate.isEdit;
            console.log( "bianji:",$scope.evaluate.isEdit);
        };
        $scope.back = function(){
            $ionicHistory.goBack();
            console.log("back");
        };
        $scope.choseClass=function(classNum){
            if(classNum==1){
                $scope.evaluate.oneMark=! $scope.evaluate.oneMark;
                $scope.evaluate.twoMark=false;
                $scope.evaluate.threeMark=false;
                $scope.evaluate.fourMark=false;
                $scope.evaluate.fiveMark=false;
                $scope.evaluate.star=1;
            }
            else if(classNum==2){
                $scope.evaluate.twoMark=!$scope.evaluate.twoMark;
                $scope.evaluate.oneMark=false;

                $scope.evaluate.threeMark=false;
                $scope.evaluate.fourMark=false;
                $scope.evaluate.fiveMark=false;
                $scope.evaluate.star=2;

            }
            else if(classNum==3){
                $scope.evaluate.threeMark=!$scope.evaluate.threeMark;
                $scope.evaluate.oneMark=false;
                $scope.evaluate.twoMark=false;

                $scope.evaluate.fourMark=false;
                $scope.evaluate.fiveMark=false;
                $scope.evaluate.star=3;
            }
            else if(classNum==4){
                $scope.evaluate.fourMark=!$scope.evaluate.fourMark;
                $scope.evaluate.oneMark=false;
                $scope.evaluate.twoMark=false;
                $scope.evaluate.threeMark=false;

                $scope.evaluate.fiveMark=false;
                $scope.evaluate.star=4;
            }
            else if(classNum==5){
                $scope.evaluate.fiveMark=!$scope.evaluate.fiveMark;
                $scope.evaluate.oneMark=false;
                $scope.evaluate.twoMark=false;
                $scope.evaluate.threeMark=false;
                $scope.evaluate.fourMark=false;
                $scope.evaluate.star=5;

            }

        }
        //点击跳出查看图片modal
        $ionicModal.fromTemplateUrl('showImage.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.showImageModal = modal;
        });
        //显示大图MODAL
        $scope.openShowImgModal = function() {
            console.log("登陆");
            $scope.showImageModal.show();

        };
        $scope.closeShowModal=function(){
            $scope.showImageModal.hide();
        };
        // Cleanup the modal when we're done with it
        $scope.$on('$destroy', function() {

        });

        //   点击查看评论图片
        $scope.showImage=function(src){
            $scope.ImageToShow.src=src;
            $scope.openShowImgModal();
            console.log("tupian", $scope.ImageToShow.src);

        }
        //弹出确认提交成功提示
        $scope.showAlert = function () {
            $ionicPopup.alert({
                title: '评论',
                content: '提交评论成功！'
            }).then(function (res) {
                console.log('提交成功！');
                $location.path('/to_evaluate_list');
            });
        };
        // 提交评论
        $scope.commitReview=function () {
            var content=$scope.evaluate.content;
            var star=$scope.evaluate.star;
            var articleId=$scope.evaluate.articleId;

            console.log("提交评论的参数：",content,star,articleId);
            console.log("评论内容：",$scope.evaluate.content);
            Artical.commitReview(content,star,articleId).then(function(response){
                console.log("发布评论后：",response);
                if(response.result=="success"){
                    $scope.showAlert();
                }

            },function(err){
                alert("评论提交失败！");
            })
        }
        //添加图片的附件
        $scope.addAttachment = function() {
                nonePopover();
                $ionicActionSheet.show({
                    buttons: [
                       { text: '相机' },
                       { text: '图库' }
                     ],
                    cancelText: '关闭',
                    cancel: function() {
                       return true;
                     },
                 buttonClicked: function(index) {

                      switch (index){

                                case 0:
                                    appendByCamera();
                                   break;
                               case 1:

                                    pickImage();
                                break;
                              default:
                                   break;
                              }
                   return true;
                   }
             });
        }


        //image picker
        $scope.pickImage = function (mark) {
            if(mark==1){
                $scope.isShow1=false;
            }
            if(mark==2){
                $scope.isShow2=false;
            }
            if(mark==3){
                $scope.isShow3=false;
            }





            var options = {
                maximumImagesCount: $scope.images_list.num,
                width: 800,
                height: 800,
                quality: 80
            };

            $cordovaImagePicker.getPictures(options)
                .then(function (results) {
                    console.log(results);
                  if($scope.images_list.num==3){    //还可以选三张
                    if(results.length==0){   //但只选了0张
                      $scope.images_list.srcList = ['images/camera.png','images/add.png','images/add1.png'];
                      $scope.images_list.num=3;
                    }
                    else if(results.length==1){
                      $scope.images_list.srcList.shift();
                      $scope.images_list.srcList.unshift(results[0]);
                      $scope.images_list.num=2;
                    }
                    else if(results.length==2){
                      $scope.images_list.srcList.splice(0,2);
                      $scope.images_list.srcList.unshift(results[0],results[1]);
                      $scope.images_list.num=1;
                    }
                    else if(results.length==3){
                      $scope.images_list.srcList.splice(0,3);
                      $scope.images_list.srcList.push(results[0],results[1],results[2]);
                      $scope.images_list.num=0;
                    }

                  }
                  else if($scope.images_list.num==2) {   //还可以选择两张
                    if (results.length == 0) {   //但只选了0张

                      $scope.images_list.num = 2;
                    }
                    else if (results.length == 1) {

                      $scope.images_list.srcList.splice(1, 1,results[0]);
                      $scope.images_list.num = 1;
                    }
                    else if (results.length == 2) {

                      $scope.images_list.srcList.splice(1, 2,results[0], results[1]);
                      $scope.images_list.num = 0;
                    }
                  }

                  else if($scope.images_list.num==1) {   //还可以选择两张
                    if (results.length == 0) {   //但只选了0张

                      $scope.images_list.num = 1;
                    }
                    else if (results.length == 1) {

                      $scope.images_list.srcList.splice(2,1, results[0]);
                      $scope.images_list.num = 0;
                    }

                  }
                  else if($scope.images_list.num==0) {   //还可以选择两张
                    alert("最多只能选取三张照片");

                  }

                }, function (error) {
                    // error getting photos
                });

        }
        //上传图片
        $scope.uploadPic=function(){

          var j=3-$scope.images_list.num;

          for(var i=0;i<j;i++){
            FileUtil.upload( $scope.images_list.srcList[i]).then(function (response) {


            },function (err) {
              $scope.isUpload==false;

            });
          }



        }
        //提交评论
        $scope.commitReview=function(){
          Artical.commitReview($scope.evaluate.content,$scope.evaluate.star,$scope.evaluate.articleId).then(function(response){
            $scope.uploadPic();//先提交评论，然后再上传图片
            if($scope.isUpload==true){
              alert("评论成功！");
              $location.path('/to_evaluate_list');
            }
            else if($scope.isUpload==false){
              alert("提交失败，请重新提交评论！");
            }

          },function(err){
            alert("提交失败，请重新提交评论！");
          })
        }
      //获取所有评论
      $scope.getArticleReview=function(){
        alert($scope.articleId);
        // Artical.getReview( $scope.articleId,$scope.page).then(function(response){
         Artical.getReview(924,$scope.page).then(function(response){

           $scope.evaluateItems=response;
           console.log("评论的内容：",$scope.evaluateItems);
        },function(err){
          alert("获取评论失败！");
        })
      };
      $scope.getArticleReview();

       });





