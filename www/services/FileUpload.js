/**
 * Created by Administrator on 2015/8/25.
 */
'use strict';
angular.module('myApp.services')
.factory('FileUtil',function(ENV, $cordovaFileTransfer,$http,$resource, $log, $q, Storage){

        //服务器的上传接口
        var serveURL =ENV.api+"/comment_puts_image.json";
        return{
            //文件上传
            /*@fileURI 文件路径
            * */
            upload:function(fileURI){
                /*The FileTransfer object provides a way to upload files to a remote server using an HTTP multi-part POST request. Both HTTP and HTTPS protocols are supported. Optional parameters can be specified by passing a FileUploadOptions object to the upload() method. On successful upload, a FileUploadResult object is passed to the success callback. If an error occurs, a FileTransferError object is passed to the error callback.
                * 也就是说FileTransfer 提供了一种方式去上传文件,HTTP multi-part POST.我们平常在前端使用form表单当指定enctype="multipart/form-data"就是这种规范。
                * 如下例子1：
                * <form action="file_upload.json" method="post" enctype="multipart/form-data">
                * <input type="hide" name="isApp" value="true">
                 <input type="file" name="uploadFile" multiple="multiple">
                 <input type="submit" value="提交">
                 </form>
                 参考：http://cordova.apache.org/docs/en/3.1.0/cordova_file_file.md.html#FileTransfer
                 这里需要特别注意：需要引入cordova支持，才有FileTransfer() FileUploadOptions()这些类。
                 因为我这里使用的是ngCordova(参考大神的文章：http://www.haomou.net/2015/01/05/2015_ionic_ngCordova/)，简单来说就是又封装了一层，方便移动端使用。
                 ngCordova的插件使用参考：http://ngcordova.com/docs/plugins/fileTransfer/（这个是file-transfer），如果你去看源码你会发现其实就是调用的cordova的FileTransfer
                * */
                /*不使用FileUploadOption的原因是ngCordova里面把这个配置项类给去了，使用了一个{}对象来实现，没有区别，要使用new FileUploadOption()需要引入cordova的，因为我这里没有就是用的官方给出的例子*/
                //对于options 官方给出的解释是Optional parameters，并没有过多的解释，在使用的时候很不明白，对于我这样的小白来说简直就是一个巨坑，参考了诸多大神写的代码和查询了无数的资料以后现在我来说一下我的理解，在这里感谢诸位大神的分享：
                //列出大神的文章地址以便参考：http://my.oschina.net/u/561475/blog/104308
                //                       http://my.oschina.net/twinkling/blog/474297
                var options = {};
                options.fileKey = "uploadFile";//用于设置参数，对应form表单里控件的name属性，这是关键，废了一天时间，完全是因为这里，这里的参数名字，和表单提交的form对应
                //文件名字就好
                options.fileName = fileURI.substr(fileURI.lastIndexOf('/') + 1);


                //如果是图片格式，就用image/jpeg，其他文件格式上官网查API

                options.mimeType = "nultipart/form-data";

                //options.mimeType = "multipart/form-data";//这两个参数修改了，后台就跟普通表单页面post上传一样 enctype="multipart/form-data"


                    //这里我把isApp 用params的方式，也就是通过？key&value的方式追加在url后面，成功上传文件
                //如果我不用也能上传成功，但是后台提示的信息显示保存到了别的位置，我觉得应该是这样的，后台通过isApp来表示上传的文件保存到哪里，但是我不理解的是
                //form 表单设置enctype="multipart/form-data"时候对于非file标识的input是如何传递给后台的，我这里采取的方式是追加在url，居然也可以接受，这一块还需要研究，主要要搞懂后台和协议的细节
                 var params = new Object();

                 params.isApp = true;
                 params.articleId =924;

                 options.params = params;
                /*var data = new FormData();
                var filename = fileURI.substr(fileURI.lastIndexOf('/')+1);
                data.append('filename',filename);
                data.append('isApp',true);

                data.append('uploadFile',new Blob(fileURI,{type:'image.jpg'}));

                var args = {
                    method: 'POST',
                    url: serveURL,
                    data: data,
                    headers: {'Content-Type': undefined},
                };*/
                var deferred=$q.defer();
                var promise =deferred.promise;
                document.addEventListener('deviceready', function () {

                    $cordovaFileTransfer.upload(serveURL, fileURI, options)
                        .then(function(response) {
                            //这里的result 就是返回http协议的response的data，没有header 和state那些
                            // Success!
                            //网络无问题
                            console.log('访问url成功',response);
                            // alert(result);
                            //alert(JSON.stringify(result));

                            //返回请求的数据，也有可能是失败的信息，虽然网络请求成功了，但是服务器因为一些原因没有做客户端想的事情，告诉客户端错误信息
                            if(response.result){
                                console.log("data.response defined");
                              //  alert('data.response defined');
                                deferred.resolve("上传成功！");
                            }else {
                                console.log("data.response undefined");
                                //alert("data.response undefined");
                                //alert("data.message:");
                                //alert(result.message);
                                console.log("data.message:",result.message);
                                deferred.reject(result.message);
                            }
                        }, function(err) {
                            // Error
                            console.log('网络错误:',err);
                            alert('网络错误');
                            deferred.reject("上传失败！");
                        }, function (progress) {
                            // constant progress updates
                        });

                }, false);

                //start 测试
                // var data={bean:{
                //     path:"u/common/20151008/1444272985382.png"
                // }};
                //
                //
                // var sss = JSON.stringify(data);
                // console.log(sss);
                // deferred.resolve(sss);
                //end 测试
                return promise;



            },
            download:function(serveURL,fileURI,options){

            }
        }

    });
