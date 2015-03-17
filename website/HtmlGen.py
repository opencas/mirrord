#!/usr/bin/python
#coding:utf-8
import os,re
from pyh import *
import time  


header ='''
<!DOCTYPE HTML>
<!--[if IE 8]> <html class="ie8 no-js"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--> <html class="no-js"> <!--<![endif]-->
<head>
    <!-- begin meta -->
    <meta charset="utf-8">
    <meta name="description" content="Open Source Mirrors station of OpenCAS">
    <meta name="keywords" content="Mirrors,Open Source,OpenCAS">
    <meta name="author" content="OpenCAS">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <!-- end meta -->
    
    <!-- begin CSS -->
    <link href="style.css" type="text/css" rel="stylesheet" id="main-style">
    <!-- REVOLUTION BANNER CSS SETTINGS -->
    <link rel="stylesheet" type="text/css" href="css/revslider.css" media="screen">
    <link href="css/responsive.css" type="text/css" rel="stylesheet">
    <!--[if IE]> <link href="css/ie.css" type="text/css" rel="stylesheet"> <![endif]-->
    <link href="css/colors/blue.css" type="text/css" rel="stylesheet" id="color-style">
    <!-- end CSS -->
    
    <link href="images/favicon.ico" type="image/x-icon" rel="shortcut icon">
    
    <!-- begin JS -->
    <script src="js/jquery-1.8.2.min.js" type="text/javascript"></script> <!-- jQuery -->
    <script src="js/ie.js" type="text/javascript"></script> <!-- IE detection -->
    <script src="js/jquery.easing.1.3.js" type="text/javascript"></script> <!-- jQuery easing -->
    <script src="js/modernizr.custom.js" type="text/javascript"></script> <!-- Modernizr -->
    <!--[if IE 8]>
    <script src="js/respond.min.js" type="text/javascript"></script> 
    <script src="js/selectivizr-min.js" type="text/javascript"></script> 
    <![endif]--> 
    
    <script src="js/ddlevelsmenu.js" type="text/javascript"></script> <!-- drop-down menu -->
    <script type="text/javascript"> <!-- drop-down menu -->
        ddlevelsmenu.setup("nav", "topbar");
    </script>
    <script src="js/tinynav.min.js" type="text/javascript"></script> <!-- tiny nav -->
    <script src="js/jquery.validate.min.js" type="text/javascript"></script> <!-- form validation -->
    <script src="js/jquery.flexslider-min.js" type="text/javascript"></script> <!-- slider -->
    <script src="js/jquery.jcarousel.min.js" type="text/javascript"></script> <!-- carousel -->
    <script src="js/jquery.ui.totop.min.js" type="text/javascript"></script> <!-- scroll to top -->
    <script src="js/jquery.fitvids.js" type="text/javascript"></script> <!-- responsive video embeds -->
    <!--<script src="js/jquery.tweet.js" type="text/javascript"></script>  Twitter widget -->
    <script src="js/jquery.tipsy.js" type="text/javascript"></script> <!-- tooltips -->
    <!-- jQuery REVOLUTION Slider  -->
    <script type="text/javascript" src="js/revslider.jquery.themepunch.plugins.min.js"></script> <!-- swipe gestures -->
    <script type="text/javascript" src="js/revslider.jquery.themepunch.revolution.js"></script>
    <!-- REVOLUTION BANNER CSS SETTINGS -->
    <script src="js/jquery.fancybox.pack.js" type="text/javascript"></script> <!-- lightbox -->
    <script src="js/jquery.fancybox-media.js" type="text/javascript"></script> <!-- lightbox -->
    <script src="js/froogaloop.min.js" type="text/javascript"></script> <!-- video manipulation -->
    <script src="js/custom.js" type="text/javascript"></script> <!-- jQuery initialization -->
    <!-- end JS -->
    
    <title>OpenCAS - 中科院开源软件协会</title>
</head>

<body class="wide">
<!-- begin container -->
<div id="wrap">
    <!-- begin header -->
    <header id="header" class="container clearfix">
        <!-- begin logo -->
        <h1 id="logo"><a href="index.html"><img width="290" height="90" src="images/opencaslogo.png" alt="Exquiso"></a></h1>
        <!-- end logo -->
        
        <!-- begin navigation wrapper -->
        <div class="nav-wrap clearfix">

        <!-- begin navigation -->
        <nav id="nav">
            <ul id="navlist" class="clearfix">
                <li class="current"><a href="http://mirrors.opencas.cn/" rel="submenu1">Mirrors</a>
                    <ul id="submenu1" class="ddsubmenustyle">
                        <li><a href="index.html">Help</a></li>
                    </ul>
                </li>
                <li><a href="http://forum.opencas.org" rel="submenu2">Forum</a>
                </li>
            </ul>
        </nav>
        <!-- end navigation -->
        </div>
        <!-- end navigation wrapper -->
    </header>
    <!-- end header -->
    
    <!-- begin slider -->
    <section id="slider-home">
        <div class="bannercontainer">
           <div class="banner">
                <ul>
                    <!-- slide 1 -->
                    <li data-transition="fade" data-slotamount="7" data-masterspeed="300">
                        <!-- main image -->
                        <img src="images/slider/revslider/slides/transparent.png" alt=""> <!-- necessary -->
                        
                        <!-- captions -->
                        <div class="tp-caption fade"
                             data-x="0"
                             data-y="0"
                             data-speed="1000" 
                             data-start="500" 
                             data-easing="easeOutExpo">
                                <img src="images/slider/revslider/slides/backgrounds/sun-1020x430.png" alt="">
                        </div>
                        
                        <div class="tp-caption black lft"
                             data-x="40"
                             data-y="147"
                             data-speed="1000" 
                             data-start="800" 
                             data-easing="easeInOutQuint">
                                <h2>中科院开源软件镜像站发布！</h2>
                        </div>
                        
                        <div class="tp-caption black lfl"
                             data-x="40"
                             data-y="203"
                             data-speed="1000"
                             data-start="1000"
                             data-easing="easeInOutQuint">
                                <p>中国科学院开源软件协会(OpenCAS)发布开源镜像站服务</p>
                        </div>

                        <div class="tp-caption lfb"
                             data-x="40"
                             data-y="256"
                             data-speed="1000"
                             data-start="1200"
                             data-easing="easeInOutQuint">
                                    <a href="http://www.opencas.org/" class="button">了解更多</a>
                        </div>

                        <div class="tp-caption lfr"
                             data-x="478"
                             data-y="9"
                             data-speed="1000" 
                             data-start="1800" 
                             data-easing="easeOutExpo">
                                <img src="images/slider/revslider/slides/1.png" alt="">
                        </div>
                    </li>
                    
                    <!-- slide 2 -->
                    <li data-transition="fade" data-slotamount="7" data-masterspeed="300">
                        <!-- main image -->
                        <img src="images/slider/revslider/slides/transparent.png" alt=""> <!-- necessary -->
                        
                        
                        <!-- captions -->
                        <div class="tp-caption fade"
                             data-x="0"
                             data-y="0"
                             data-speed="1000" 
                             data-start="500" 
                             data-easing="easeOutExpo">
                                <img src="images/slider/revslider/slides/backgrounds/sun-1020x430.png" alt="">
                        </div>
                        
                        <div class="tp-caption black lft"
                             data-x="40"
                             data-y="147"
                             data-speed="1000" 
                             data-start="800" 
                             data-easing="easeInOutQuint">
                                <h2>中国科学院大学免流量下载！</h2>
                        </div>
                        
                        <div class="tp-caption black lfl"
                             data-x="40"
                             data-y="203"
                             data-speed="1000"
                             data-start="1000"
                             data-easing="easeInOutQuint">
                                <p>中国科学院大学可在本站享受IPv6免校园流量下载镜像</p>
                        </div>

                        <div class="tp-caption lfr"
                             data-x="478"
                             data-y="9"
                             data-speed="1000" 
                             data-start="1800" 
                             data-easing="easeOutExpo">
                                <img src="images/slider/revslider/slides/2.png" alt="">
                        </div>
                    </li>
                    
                    <!-- slide 3 -->
                    <li data-transition="fade" data-slotamount="7" data-masterspeed="300">
                        <!-- main image -->
                        <img src="images/slider/revslider/slides/transparent.png" alt=""> <!-- necessary -->
                        
                        <!-- captions -->
                        <div class="tp-caption fade"
                             data-x="0"
                             data-y="0"
                             data-speed="1000" 
                             data-start="500" 
                             data-easing="easeOutExpo">
                                <img src="images/slider/revslider/slides/backgrounds/sun-1020x430.png" alt="">
                        </div>
                        
                        <div class="tp-caption black lft"
                             data-x="40"
                             data-y="147"
                             data-speed="1000" 
                             data-start="800" 
                             data-easing="easeInOutQuint">
                                <h2>中国科技网(CSTNET)鼎力支持</h2>
                        </div>
                        
                        <div class="tp-caption black lfl"
                             data-x="40"
                             data-y="203"
                             data-speed="1000"
                             data-start="1000"
                             data-easing="easeInOutQuint">
                                <p>经由中国科技网IPv4/IPv6双栈互联网接入服务,高速访问互联网</p>
                        </div>
                        
                        <div class="tp-caption lfb"
                             data-x="40"
                             data-y="256"
                             data-speed="1000"
                             data-start="1200"
                             data-easing="easeInOutQuint">
                                    <a href="http://www.cstnet.net.cn/" class="button">了解更多</a>
                        </div>

                        <div class="tp-caption lfr"
                             data-x="478"
                             data-y="9"
                             data-speed="1000" 
                             data-start="1800" 
                             data-easing="easeOutExpo">
                                <img src="images/slider/revslider/slides/3.png" alt="">
                        </div>

                    </li>
                    
                    <!-- slide 4 -->
                    <li data-transition="fade" data-slotamount="7" data-masterspeed="300">
                        <!-- main image -->
                        <img src="images/slider/revslider/slides/transparent.png" alt=""> <!-- necessary -->
                        
                        <!-- captions -->
                        <div class="tp-caption fade"
                             data-x="0"
                             data-y="0"
                             data-speed="1000" 
                             data-start="500" 
                             data-easing="easeOutExpo">
                                <img src="images/slider/revslider/slides/backgrounds/sun-1020x430.png" alt="">
                        </div>
                        
                        <div class="tp-caption black lft"
                             data-x="40"
                             data-y="147"
                             data-speed="1000" 
                             data-start="800" 
                             data-easing="easeInOutQuint">
                                <h2>镜像站内容正在不断完善</h2>
                        </div>
                        
                        <div class="tp-caption black lfl"
                             data-x="40"
                             data-y="203"
                             data-speed="1000"
                             data-start="1000"
                             data-easing="easeInOutQuint">
                                <p>欢迎提交镜像收纳建议，我们将不断丰富镜像内容</p>
                        </div>

                        <div class="tp-caption lfr"
                             data-x="478"
                             data-y="9"
                             data-speed="1000" 
                             data-start="1800" 
                             data-easing="easeOutExpo">
                                <img src="images/slider/revslider/slides/4.png" alt="">
                        </div>

                    </li>
                </ul>       
                <div class="tp-bannertimer tp-bottom"></div>
           </div>
        </div>   
    </section>
    <!-- end slider -->
            
    <!-- begin content -->
    <section id="content" class="container clearfix">
        <!-- begin services -->
        <section>
            <div class="iconbox-wrap clearfix">
                <div class="one-fourth">
                    <div class="iconbox applications">
                        <a href="#">
                            <h3 class="iconbox-title"><span class="iconbox-icon"></span>最新官方镜像</h3>
                            <p>我们提供标准的官方镜像文件。所有镜像均同步自官方源，并使用官方同步脚本，保证镜像质量和及时更新。</p>
                        </a>
                    </div>
                </div>
                <div class="one-fourth">
                    <div class="iconbox computer">
                        <a href="#">
                            <h3 class="iconbox-title"><span class="iconbox-icon"></span>Linux发行版</h3>
                            <p>我们提供最全面的linux发行版。这里包含全面的镜像版本,您将获得丰富的发行版镜像，均同步自发行版官方源。</p>
                        </a>
                    </div>
                </div>
                <div class="one-fourth">
                    <div class="iconbox iphone">
                        <a href="#">
                            <h3 class="iconbox-title"><span class="iconbox-icon"></span>Android SDK</h3>
                            <p>还在为Android SDK获取而烦恼吗？我们提供全版本的Android SDK和飞速的下载速度，帮助Android开发者免去“墙”的烦恼。</p>
                        </a>
                    </div>
                </div>
                <div class="one-fourth">
                    <div class="iconbox mouse">
                        <a href="http://forum.opencas.org">
                            <h3 class="iconbox-title"><span class="iconbox-icon"></span>OpenCAS论坛</h3>
                            <p>还在为难题而头疼吗？来OpenCAS论坛问问大神吧！这里有大批社区精英，大量高质量的技术探讨，总有一条适合你。</p>
                        </a>
                    </div>
                </div>
                
            </div>
        </section>
        <!-- end services -->
        
        <hr>
        
        <!-- begin table -->
            <section >
                <h2>Mirrors</h2>
                <table class="gen-table">
                    <thead>
                        <tr>
                            <th>Folder</th>
                            <th>Last Update</th>
                            <th>Help</th>
                        </tr>
                    </thead>
                    <tfoot>
                        <tr>
                            <td colspan="4">We are adding more mirrors!</td>
                        </tr>
                    </tfoot>
                    <tbody>
'''


footer = '''
</tbody>
</table>
            </section>
        <!-- end table -->  
        
        <object style="border:0px" type="text/x-scriptlet" data="import.htm" width=100% height=30></object>

        <hr>
        
        <!-- begin clients -->
        <section>
            <h2>Sponsors</h2>
            <div class="client-wrap">
                <ul class="clients clearfix">
                    <li><a href="http://www.acer.com"><img height="57" width="168" src="images/sponsors/acer.jpg" alt="Acer" title="Acer"></a></li>
                    <li><a href="http://www.cstnet.net.cn/"><img height="57" width="168" src="images/sponsors/cstnet.png" alt="中国科技网" title="中国科技网"></a></li>
                    <li><a href="http://www.linuxstory.org"><img height="57" width="168" src="images/sponsors/linuxstory.png" alt="Linux Story" title="Linux Story"></a></li>

                </ul>
            </div>
        </section>
        <!-- end clients -->   
    </section>
    <!-- end content -->  
    
    <!-- begin footer -->
    <footer id="footer">
        <!-- begin footer top -->
        <div id="footer-top">
            <div class="container clearfix">
                <div class="one-fourth">
                    <div class="widget">
                        <h3>About</h3>
                        <p>中国科学院开源软件协会是由中国科学院大学(UCAS)研究生组成的开源技术社区。</p>
                        <p>协会秉承“开放，自由，分享”的理念，聚集开源爱好者，分享开源技术，传递开源理念，为科学院的同学创建平台参与开源项目，与其他开源社区、企业合作交流。</p>
                    </div>
                </div>
                <div class="one-fourth">
                    <div class="widget twitter-widget">
                        <h3>Wechat</h3>
                        <div><img width="150" height="150" src="images/wechat.jpg" /></div>
                    </div>
                </div>
                <div class="one-fourth">
                    <div class="widget newsletter">
                        <h3>Newsletter</h3>
                        <p>订阅中国科学院开源软件协会官方邮件列表，随时获取最新动态。</p>
                        <div id="newsletter-notification-box-success" class="notification-box notification-box-success" style="display: none;">
                            <p>You have successfully subscribed to our newsletter.</p>
                            <a href="#" class="notification-close notification-close-success">x</a>
                        </div>
        
                        <div id="newsletter-notification-box-error" class="notification-box notification-box-error" style="display: none;">
                            <p>Your email address couldn't be subscribed because a server error occurred. Please try again later.</p>
                            <a href="#" class="notification-close notification-close-error">x</a>
                        </div>
                        <form id="newsletter-form" class="content-form" action="#" method="post">
                            <input id="newsletter" type="email" name="newsletter" placeholder="Enter your email address &hellip;" class="required">
                            <input id="subscribe" class="button" type="submit" name="subscribe" value="Subscribe">
                        </form>
                    </div>
                </div>
                <div class="one-fourth column-last">
                    <div class="widget contact-info">
                        <h3>Contact</h3>
                        <div>
                            <p class="address"><strong>Address:</strong> No.4，Zhongguancun South Fourth Street, Beijing, China 北京市 海淀区 中关村南四街4号</p>
                            <p class="email"><strong>Email:</strong> <a href="mailto:charlie@opencas.org">charlie@opencas.org</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- end footer top -->

        <!-- begin footer bottom -->
        <div id="footer-bottom">
            <div class="container clearfix">
                <div class="one-half">
                    <p>Copyright &copy; 2015 OpenCAS. 中科院开源软件协会镜像站运行于Acer Altos 宏碁服务器 </p>
                </div>
        
                <div class="one-half column-last">
                    <ul class="social-links">
                    </ul>
                </div>
            </div>
        </div>
        <!-- end footer bottom -->
    </footer>
    <!-- end footer -->  
</div>
<!-- end container -->
</body>
</html>


<script>

  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){

  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),

  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)

  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');



  ga('create', 'UA-60517652-1', 'auto');

  ga('send', 'pageview');



</script>


'''

  #                  
  #                      <tr>
  #                          <td>Item 1</td>
   #                         <td>Description</td>
  #                          <td>Subtotal:</td>
   #                          <td>&#36;1.00</td>
   #                      </tr>
     #                    <tr class="odd">
       #                      <td>Item 2</td>
         #                    <td>Description</td>
           #                  <td>Discount:</td>
             #                <td>&#36;2.00</td>
               #          </tr>
                 #        <tr>
  #                           <td>Item 3</td>
    #                         <td>Description</td>
      #                       <td>Shipping:</td>
        #                     <td>&#36;3.00</td>
          #               </tr>
            #             <tr class="odd">
              #               <td>Item 4</td>
                #             <td>Description</td>
                  #           <td>Tax:</td>
                    #         <td>&#36;4.00</td>
                      #   </tr>

      #               


def getdirsize(dir):  
    size = 0L  
    for root, dirs, files in os.walk(dir):  
        size += sum([os.path.getsize(os.path.join(root, name)) for name in files])  
    return size  


def GetCurPathInfo():  
    CurPath = '/data/mirrors'
    #CurPath = os.getcwd()
    ChildrenList = os.listdir(CurPath)  
    ChildrenList.sort()

    InfoDict = dict()  

    last_modify_file_dict = {
        'centos' : '/timestamp.txt',
        'android' :'/repository',
        'epel':'/fullfilelist',
        'pypi':'/status'
    }
    
    for Name in ChildrenList:
        if os.path.isdir(CurPath+"/"+Name) :
            tempInfo = os.stat(CurPath+"/"+Name)
            if Name in last_modify_file_dict:
                tempInfo = os.stat(CurPath+"/"+Name + last_modify_file_dict[Name])
            #tempDict = dict( [('Size', tempInfo.st_size),('CreateTime',time.ctime(tempInfo.st_ctime)),('Help','http://wiki.opencas.org/'+Name),('Link','http://mirrors.opencas.cn/'+Name)])  
            tempDict = dict( [('CreateTime',time.ctime(tempInfo.st_mtime)),('Help','http://www.opencas.cn/'),('Link','http://mirrors.opencas.cn/'+Name)])
            InfoDict[Name] = tempDict  
    return InfoDict


def ContentGen(InfoDict):
    Content = dict()
    for info in InfoDict:
        content = tr()

        Helptd = td()
        Helptd << a('Help',href = InfoDict[info]['Help'])

        Nametd = td()
        Nametd << a(info,href = InfoDict[info]['Link'])

        content << Nametd +  td(InfoDict[info]['CreateTime']) +Helptd
        Content[info] = content.render()
    return Content

def main():
    InfoDict = GetCurPathInfo()
    Content = ContentGen(InfoDict)

    Html = ""
    keys = Content.keys() 
    keys.sort() 
    for each in map(Content.get, keys) :
        Html = Html + each

    page = header + Html + footer

    Savefile = open('/data/website/index.html','w')
    Savefile.write(page)
    Savefile.close()

if __name__ == '__main__':
    main()



