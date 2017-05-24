/**
 * Created by Palov on 2017/5/16.
 */

var myDemoInfor, ifDemoAn = false;
var inforTop, skillsTop, myWorkTop, contactMeTop, myNav, myNavTagA;
var myDocHeight = document.documentElement.clientHeight;
var ifMobile = false;

/*判断是移动端还是PC端*/
if (document.documentElement.clientWidth < 767) {
    ifMobile = true;
    var myDemosHeight = 4;
}

/*预加载图片*/
imgLoader(['img/diagram-active.gif', 'img/diagram-left.png', 'img/diagram-right.png', 'img/diagram-tail.gif', 'img/head.jpg', 'img/huangouweb.jpg', 'img/magnify-alt.png', 'img/offlineNotepad.jpg', 'img/resumeBG.jpg', 'img/resumeBG2.jpg', 'img/tangmao.jpg', 'img/hongbaoyao1yao.jpg'], function (percentage) {
    var percentT = percentage * 100;
    document.querySelector(".myCoverSpan").innerText = 'Loading ' + (parseInt(percentT)) + '%';
    document.querySelector(".myCoverSpanLine").style.width = percentT + '%';
    if (percentage == 1) {
        setTimeout(function () {
            document.querySelector(".myContent").style.display = 'block';
            document.querySelector(".spinner").setAttribute("class", "spinner fadeOut-An");
            document.querySelector(".myCover").setAttribute("class", "myCover fadeOut-An");

            /*定义skills部分视差滚动背景的位置与大小*/
            var mySkillsBG = document.querySelector(".skillsBG");
            var myDocWidth = document.documentElement.clientWidth;
            mySkillsBG.style.width = myDocWidth + 'px';
            mySkillsBG.style.marginLeft = -myDocWidth * 0.5 + 'px';

            var inSkillBG = document.querySelector(".inSkillBG");
            if (ifMobile) {
                inSkillBG.style.height = mySkillsBG.clientHeight + 'px';
            } else {
                inSkillBG.style.height = 1.5 * mySkillsBG.clientHeight + 'px';
                inSkillBG.style.marginTop = -mySkillsBG.clientHeight + 'px';
            }
            changeDemoAjax(0);
            setTimeout(function () {
                document.querySelector(".spinner").style.display = 'none';
                document.querySelector(".myCover").style.display = 'none';

                var myWorkImgs = document.querySelector(".myWorks").getElementsByTagName("img");
                for (var i = 0; i < myWorkImgs.length; i++) {
                    myWorkImgs[i].style.marginLeft = -(myWorkImgs[i].clientWidth - document.querySelector(".myDemo").clientWidth) * 0.5 + 'px';
                }

                var myDemos = document.getElementsByClassName("myDemos");
                var demoClientH = document.querySelector(".myDemos").clientHeight;
                var demoClientW = document.querySelector(".myDemos").clientWidth;
                if (ifMobile) {
                    document.getElementById("myWork").getElementsByTagName("section")[0].style.height = myDemosHeight * demoClientH + 'px';
                    for (var i = 0; i < myDemos.length; i++) {
                        myDemos[i].style.transform = 'translate3d(0px,' + i * demoClientH + 'px,0px)'
                    }
                } else {
                    document.getElementById("myWork").getElementsByTagName("section")[0].style.height = 2 * demoClientH + 'px';
                    for (var i = 0; i < myDemos.length; i++) {
                        if (i < 3) {
                            myDemos[i].style.transform = 'translate3d(' + i * demoClientW + 'px,0px,0px)'
                        } else {
                            myDemos[i].style.transform = 'translate3d(' + (i - 3) * demoClientW + 'px,' + demoClientH + 'px,0px)'
                        }
                    }
                }

                inforTop = document.getElementById("Infor").offsetTop - 50;
                skillsTop = document.getElementById("skills").offsetTop - 50;
                myWorkTop = document.getElementById("myWork").offsetTop - 50;
                contactMeTop = document.getElementById("contactMe").offsetTop - 50;

                myNav = document.getElementsByTagName('nav')[0];
                myNavTagA = myNav.getElementsByTagName('a');

                myDemoInfor = document.getElementById("myDemoInfor");
                if (ifMobile) {
                    myDemoInfor.onclick = function () {
                        ifDemoAn = true;
                        myDemoInfor.style.transform = 'translate3d(0px,0px,0px) scale3d(1,1,1)';
                        setTimeout(function () {
                            BeginScroll();
                            ifDemoAn = false
                        }, 550)
                    }
                } else {
                    document.querySelector(".closeCover").onclick = function () {
                        ifDemoAn = true;
                        myDemoInfor.style.transform = 'translate3d(0px,' + 0.75 * myDocHeight + 'px,0px) scale3d(0.001,0.001,0)';
                        setTimeout(function () {
                            myDemoInfor.style.transform = 'translate3d(0px,0px,0px)';
                            BeginScroll();
                            ifDemoAn = false
                        }, 550)
                    };
                }

                /*myDemo部分切换类型*/
                var myDemoList = document.querySelector(".demoList").getElementsByTagName('a');
                var myDemo = document.getElementsByClassName("myDemo");
                for (var i = 0; i < myDemoList.length; i++) {
                    myDemoList[i].onclick = function () {
                        for (var i = 0; i < myDemoList.length; i++) {
                            myDemoList[i].parentNode.setAttribute("class", "");
                        }
                        this.parentNode.setAttribute("class", "active");

                        var str = true;
                        if (this.title == 'All') {
                            str = false;
                        } else if (this.title == 'PC') {
                            str = 'PC';
                        } else if (this.title == 'mobile') {
                            str = 'mobile';
                        }

                        var theDomNow = 0;
                        for (var i = 0; i < myDemos.length; i++) {
                            var myArr = myDemo[i].className.split(" ");
                            myDemo[i].className = myArr[0] + ' ' + myArr[1];
                            if (str) {
                                var myStr = 'myDemo ' + str + 'Demo';
                                /*console.log(myStr);*/
                                if (myDemo[i].className == myStr) {
                                    myDemo[i].className += ' scaleIn-An';
                                    theDomNow = theDomNow + 1;
                                } else {
                                    myDemo[i].className += ' scaleOut-An';
                                }
                                if (ifMobile) {
                                    myDemos[i].style.transform = 'translate3d(0px,' + (theDomNow - 1) * demoClientH + 'px,0px)'
                                } else {
                                    if (theDomNow < 3) {
                                        myDemos[i].style.transform = 'translate3d(' + (theDomNow - 1) * demoClientW + 'px,0px,0px)'
                                    } else {
                                        myDemos[i].style.transform = 'translate3d(' + (theDomNow - 4) * demoClientW + 'px,' + demoClientH + 'px,0px)'
                                    }
                                }

                            } else {
                                myDemo[i].className += ' scaleIn-An';
                                if (ifMobile) {
                                    myDemos[i].style.transform = 'translate3d(0px,' + theDomNow * demoClientH + 'px,0px)'
                                } else {
                                    if (theDomNow < 3) {
                                        myDemos[i].style.transform = 'translate3d(' + theDomNow * demoClientW + 'px,0px,0px)'
                                    } else {
                                        myDemos[i].style.transform = 'translate3d(' + (theDomNow - 3) * demoClientW + 'px,' + demoClientH + 'px,0px)'
                                    }
                                }
                                theDomNow = theDomNow + 1;
                            }
                        }
                        /*console.log(parseInt(theDomNow / 3 + 1) * demoClientH);*/
                        if (ifMobile) {
                            document.getElementById("myWork").getElementsByTagName("section")[0].style.height = theDomNow * demoClientH + 'px';
                        } else {
                            document.getElementById("myWork").getElementsByTagName("section")[0].style.height = (parseInt(theDomNow / 3 + 1)) * demoClientH + 'px';
                        }
                        return false;
                    }
                }

                changeTheNav(1)
            }, 500)
        }, 500)
    }
});

window.onload = function () {
    addEvent(window, 'scroll', onScroll);
    onScroll();
};

function NoScroll() {
    if (ifMobile) {
        document.body.style.overflow = 'hidden';
    } else {
        document.documentElement.style.overflow = 'hidden';
        var move = function (e) {
            e.preventDefault && e.preventDefault();
            e.returnValue = false;
            e.stopPropagation && e.stopPropagation();
            return false;
        };
        var keyFunc = function (e) {
            if (37 <= e.keyCode && e.keyCode <= 40) {
                return move(e);
            }
        };
        document.body.onkeydown = keyFunc;
    }
}

function BeginScroll() {
    if (ifMobile) {
        document.body.style.overflow = 'auto';
    } else {
        document.documentElement.style.overflow = 'auto';
    }
}

/*项目遮罩读取数据与动画*/
function openDemoCover(Atitle) {
    if (!ifDemoAn) {
        changeDemoAjax(Atitle);
        setTimeout(function () {
            myDemoInfor.style.transform = 'translate3d(0px,' + myDocHeight + 'px,0px) scale3d(1,1,1)';
            NoScroll()
        }, 150)
    }
}

function changeDemoAjax(key) {
    var myDemo;
    if (window.XMLHttpRequest) {
        myDemo = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        myDemo = new ActiveXObject("Microsoft.XMLHTTP");
    } else {
        alert("请升级至最新版本的浏览器");
    }
    if (myDemo != null) {
        myDemo.open("GET", "data/demo.json", true);
        myDemo.send(null);
        myDemo.onreadystatechange = function () {
            if (myDemo.readyState == 4 && myDemo.status == 200) {
                var obj = JSON.parse(myDemo.responseText);
                for (var i in obj) {
                    if (i == 'Demo' + key) {
                        var myDemoCover = document.getElementById("myDemoInfor");
                        myDemoCover.getElementsByTagName('figcaption')[0].innerText = obj[i].Title;
                        var myImg = myDemoCover.getElementsByTagName('img')[0];
                        myImg.setAttribute("src", obj[i].ImgSrc);
                        myImg.setAttribute("alt", obj[i].ImgAlt);
                        myDemoCover.getElementsByTagName("p")[0].innerText = obj[i].Infor;
                        var myExtra = myDemoCover.querySelector(".extraInfor");
                        myExtra.innerText = obj[i].ExtraText;
                        myExtra.setAttribute("href", obj[i].ExtraHref);
                        myDemoCover.querySelector(".codeView").setAttribute("href", obj[i].CodeHref);
                    }
                }
            }
        }
    }
}

function backToTop() {
    myBackTop = setInterval(function () {
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        var ispeed = scrollTop / 5;
        if (scrollTop == 0) {
            clearInterval(myBackTop);
        }
        document.documentElement.scrollTop = document.body.scrollTop = scrollTop - ispeed;
    }, 30)
}

function changeTheNav(key) {
    if (key == 1 || key == 3) {
        myNav.style.background = 'rgba(0,0,0,0.5)';
        for (var i = 0; i < myNavTagA.length; i++) {
            myNavTagA[i].onmousemove = function () {
                this.style.transform = 'scale(1.3,1.3)';
                this.style.color = 'rgb(41,176,188)'
            };
            myNavTagA[i].onmouseout = function () {
                this.style.transform = 'scale(1,1)';
                this.style.color = 'rgb(255,255,255)'
            }
        }
    } else if (key == 2) {
        myNav.style.background = 'rgb(200,200,200)';
        for (var i = 0; i < myNavTagA.length; i++) {
            myNavTagA[i].onmousemove = function () {
                this.style.transform = 'scale(1.3,1.3)';
                this.style.color = 'rgb(30,200,210)'
            };
            myNavTagA[i].onmouseout = function () {
                this.style.transform = 'scale(1,1)';
                this.style.color = 'rgb(255,255,255)'
            }
        }
    } else if (key == 4) {
        myNav.style.background = 'rgb(41,176,188)';
        for (var i = 0; i < myNavTagA.length; i++) {
            myNavTagA[i].onmousemove = function () {
                this.style.transform = 'scale(1.3,1.3)';
                this.style.color = 'rgb(75,5,255)'
            };
            myNavTagA[i].onmouseout = function () {
                this.style.transform = 'scale(1,1)';
                this.style.color = 'rgb(255,255,255)'
            }
        }
    } else if (key == 5) {
        myNav.style.background = 'rgb(55,55,55)';
        for (var i = 0; i < myNavTagA.length; i++) {
            myNavTagA[i].onmousemove = function () {
                this.style.transform = 'scale(1.3,1.3)';
                this.style.color = 'rgb(41,176,188)'
            };
            myNavTagA[i].onmouseout = function () {
                this.style.transform = 'scale(1,1)';
                this.style.color = 'rgb(255,255,255)'
            }
        }
    }
}

/*视差滚动部分……好吧其实也掺杂了别的有关滚动的dom，不过也能叫做滚动视差不是么*/
function onScroll(e) {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    /*回到顶部的按钮显示与否*/
    if (!ifMobile) {
        var myTopBtn = document.getElementById("backbtn");
        if (scrollTop < 10) {
            myTopBtn.setAttribute("class", "fadeOut-An");
            myNav.style.transform = 'translate3d(0px,0px,0px)'
        } else {
            myTopBtn.setAttribute("class", "fadeIn-An");
            myNav.style.transform = 'translate3d(0px,50px,0px)'
        }
    }
    /*变换nav栏的颜色*/
    //console.log(scrollTop + ':' + myWorkTop);
    if (scrollTop > contactMeTop) {
        changeTheNav(5)
    } else if (scrollTop > myWorkTop) {
        changeTheNav(4)
    } else if (scrollTop > skillsTop) {
        changeTheNav(3)
    } else if (scrollTop > inforTop) {
        changeTheNav(2)
    } else if (scrollTop <= inforTop) {
        changeTheNav(1)
    }
    /*各部分视差滚动*/
    var myCha = 50 - 0.6 * myDocHeight;
    var myInforH3Top = document.getElementById("Infor").offsetTop - 0.3 * myDocHeight;
    var myInfor = document.getElementById("Infor");
    var mySkills = document.getElementById("skills");
    var myPowerDom = mySkills.getElementsByClassName("mySkills");
    var myPower = mySkills.getElementsByClassName("skillsPower");
    var myLever = mySkills.getElementsByClassName("level");
    var myWork = document.getElementById("myWork");
    var myContact = document.getElementById("contactMe");
    /*console.log(scrollTop+':'+parseInt(inforTop + myCha));*/
    if (scrollTop > parseInt(contactMeTop + myCha)) {
        myContact.getElementsByTagName("h1")[0].setAttribute("class", "fadeIn-An");
        if (ifMobile) {
            myContact.getElementsByTagName("ul")[0].setAttribute("class", "fadeFormTop-An");
            myContact.getElementsByTagName("figure")[0].setAttribute("class", "myResume fadeFormTop-An");
        } else {
            myContact.getElementsByTagName("ul")[0].setAttribute("class", "fadeFormLeft-An");
            myContact.getElementsByTagName("figure")[0].setAttribute("class", "myResume fadeFormRight-An");
        }
    } else if (scrollTop > parseInt(myWorkTop + myCha)) {
        myWork.getElementsByTagName("h1")[0].setAttribute("class", "fadeIn-An");
        myWork.getElementsByTagName("ul")[0].setAttribute("class", "demoList fadeIn-An");
        myWork.getElementsByTagName("section")[0].setAttribute("class", "fadeIn-An");
    } else if (scrollTop > parseInt(skillsTop + myCha)) {
        mySkills.getElementsByTagName("h1")[0].setAttribute("class", "fadeFormBottom-An");
        mySkills.getElementsByTagName("section")[0].setAttribute("class", "fadeFormBottom-An");
        for(var i = 0; i<myPower.length;i++) {
            if (parseInt(scrollTop -skillsTop + 171) > myPowerDom[i].offsetTop - 0.5 * myDocHeight) {
                myPower[i].firstChild.style.width = myLever[i].firstChild.innerText;
                myPower[i].firstChild.firstChild.setAttribute("class", "fullThePower-An");
            }
        }
    } else if (scrollTop > myInforH3Top) {
        var myH3 = myInfor.getElementsByTagName("h3")[0];
        myH3.setAttribute("class", "fadeIn-An");
        myH3.nextElementSibling.setAttribute("class", "myInfor fadeIn-An");
        myH3.nextElementSibling.nextElementSibling.setAttribute("class", "myInfor fadeIn-An");
    } else if (scrollTop > parseInt(inforTop + myCha)) {
        myInfor.getElementsByTagName("h1")[0].setAttribute("class", "fadeIn-An");
        myInfor.querySelector(".myInfor").setAttribute("class", "myInfor fadeIn-An");
    }
    /*skills部分滚动视差*/
    if (!ifMobile) {
        var skillTop = skillsTop + 50 - myDocHeight;
        var skillsBottom = document.getElementById("contactMe").offsetTop;
        if (scrollTop >= skillTop && scrollTop <= skillsBottom) {
            document.querySelector(".inSkillBG").style.top = 0.3 * scrollTop + 'px';
        }
    }
}

function addEvent(eventTarget, eventType, eventHandler) {
    if (eventTarget.addEventListener) {
        eventTarget.addEventListener(eventType, eventHandler, false);
    } else {
        if (eventTarget.attachEvent) {
            eventType = "on" + eventType;
            eventTarget.attachEvent(eventType, eventHandler);
        } else {
            eventTarget["on" + eventType] = eventHandler;
        }
    }
}
