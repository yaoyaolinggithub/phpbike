		mui.init({
			//原生顶部导航栏颜色
//			statusBarBackground: '#9defbcg',
		})
		jumpPage();
		
		function jumpPage() {
			//跳转页面
			var subpages = [
				'templete/home1.html',
				'templete/classify.html', 
				'templete/find.html', 
				'templete/shopping.html',
				'templete/about.html'
			];
			var subpage_style = {
				top: '0px',
				bottom: '51px'
			};

			var aniShow = {}; //动画显示
			//首次启动切滑效果
			mui.plusReady(function() {
				lanchScreen();
				var self = plus.webview.currentWebview();
				for(var i = 0; i < 5; i++) {
					var temp = {};
					var sub = plus.webview.create(subpages[i], subpages[i], subpage_style);
					if(i > 0) {
						sub.hide();
					} else {
						temp[subpages[i]] = "true";
						mui.extend(aniShow, temp); //合并对象
					};
					self.append(sub);
				};
				// 
//				plus.webview.currentWebview().setStyle({
//					softinputMode:"adjustResize"
//				});
//				document.getElementById('nav-import-bot').style.top = (plus.display.resolutionHeight - 45) + "px";

			});
			
			//当前激活选项
			var activeTab = subpages[0];
			var title = document.getElementById("title");
			//选项卡点击事件
			mui('.mui-bar-tab').on('tap', 'a', function(e) {
				var targetTab = this.getAttribute('href');
				if(targetTab == activeTab) {
					return;
				};
				//显示目标选项卡
				//若为iOS平台或非首次显示，则直接显示
				if(mui.os.ios || aniShow[targetTab]) {
					plus.webview.show(targetTab);
				} else {
					//否则，使用fade-in动画，且保存变量
					var temp = {};
					temp[targetTab] = "true";
					mui.extend(aniShow, temp);
					plus.webview.show(targetTab, "fade-in", 300);
				};
				//隐藏当前;
				plus.webview.hide(activeTab);
				//更改当前活跃的选项卡
				activeTab = targetTab;
			});
				//自定义事件，模拟点击“首页选项卡”
			document.addEventListener('gohome', function() {
				var defaultTab = document.getElementById("defaultTab");
				//模拟首页点击
				mui.trigger(defaultTab, 'tap');
				//切换选项卡高亮
				var current = document.querySelector(".mui-bar-tab>.mui-tab-item.mui-active");
				if(defaultTab !== current) {
					current.classList.remove('mui-active');
					defaultTab.classList.add('mui-active');
				}

			});

		}
		// 开机引导图函数
		function lanchScreen() {
			// 先取用户首次登陆标识  plus是H5+接口方法
			var showGuid = plus.storage.getItem("first");
			// 判断用户是否登陆  测试改成0每次运行都会显示   if(showGuid)会第一次安装显示
			if(showGuid) {
				// 有值说明已经登陆过了.无需显示   关闭splash页面
				plus.navigator.closeSplashscreen();
				plus.navigator.setFullscreen(false);
			} else {
				// 如果首次登陆,显示启动导航
				mui.openWindow({
					id: 'guid',
					url: 'templete/guid.html',
					show: {
						aniShow: 'none'
					},
					waiting: {
						autoShow: false
					}
				});
			};
		};