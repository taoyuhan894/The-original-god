window.onload = function () {
  let ul = $('.swiperWrapper');
  let lis = $$('.swiperDotsContainer li');
  let swiperContainer = $('.swiperContainer');
  let dotsContainer = $('.swiperDotsContainer')
  let currentImg = 0; //当前图片下标
  let timer = null;

  function stopAutoPlay() {
    clearInterval(timer);
  }
  // 自动轮播
  function startAutoPlay() {
    timer = setInterval(function () {
      // 根据当前图片的下标切换
      currentImg++;
      changeImg();
    }, 3000)
  }
  startAutoPlay();

  function changeImg() {
    if (currentImg > 3) {
      currentImg = 0;
      ul.style.left = "0px";
    } else {
      ul.style.left = -(currentImg * swiperContainer.clientWidth) + "px"
    }

    for (let items of lis) {
      items.classList.remove('swiperDotsItemActive');
    }
    lis[currentImg].classList.add('swiperDotsItemActive')
  }

  dotsContainer.onclick = function (e) {
    stopAutoPlay();
    currentImg = e.target.dataset.id;
    changeImg();
    startAutoPlay();
  }

  // 手指滑动控制轮播
  swiperContainer.ontouchstart = function (e) {
    let x = e.touches[0].clientX;
    let y = e.touches[0].clientY;
    let ulLeft = parseInt(ul.style.left); //记录当前ul的left值
    stopAutoPlay();
    ul.style.transition = "none";

    swiperContainer.ontouchmove = function (ev) {
      let disX = ev.touches[0].clientX - x;
      let disY = ev.touches[0].clientY - y;
      if (Math.abs(disX) < Math.abs(disY)) {
        return;
      }
      let newUlLeft = ulLeft + disX;
      if (newUlLeft < (-3 * swiperContainer.clientWidth)) {
        newUlLeft = -3 * swiperContainer.clientWidth
      }
      if (newUlLeft > 0) {
        newUlLeft = 0;
      }
      ul.style.left = newUlLeft + "px";
    }
    swiperContainer.ontouchend = function (ev) {
      ul.style.transition = "all .5s";
      startAutoPlay();
      let changeX = ev.changedTouches[0].clientX - x; //移动了多少
      if (changeX < -30 && currentImg != 3) {
        currentImg++;
      } else if (changeX > 30 && currentImg != 0) {
        currentImg--;
      }
      changeImg();
    }
  }


  // 获取新闻列表数据
  let newsTabList = $('.newsTabList');
  let newsTabItem = $$('.newsTabItem');
  let newsList = $('.newsList');

  newsTabList.addEventListener("click", function (e) {
    let index = Number(e.target.dataset.id);
    for (items of newsTabItem) {
      items.classList.remove("newsTabItemActive")
    }
    e.target.classList.add("newsTabItemActive");
    getInfo(index);
  }, false)

  // 一进页面就进行加载
  $ajax({
    method: 'get',
    url: '../data/newest.json',
    success: function (data) {
      addMessage(JSON.parse(data).list);
    }
  })

  function getInfo(index) {
    let message = null;
    switch (index) {
      case 0:
        $ajax({
          method: 'get',
          url: '../data/newest.json',
          success: function (data) {
            message = JSON.parse(data).list;
            addMessage(message);
          }
        })
        break;
      case 1:
        $ajax({
          method: 'get',
          url: '../data/news.json',
          success: function (data) {
            message = JSON.parse(data).list;
            addMessage(message);
          }
        })
        break;
      case 2:
        $ajax({
          method: 'get',
          url: '../data/notice.json',
          success: function (data) {
            message = JSON.parse(data).list;
            addMessage(message);
          }
        })
        break;
      case 3:
        $ajax({
          method: 'get',
          url: '../data/activity.json',
          success: function (data) {
            message = JSON.parse(data).list;
            addMessage(message);
          }
        })
        break;
    }
  }

  function addMessage(message) {
    let newMessage = message.map(function (item) {
      return `
    <li>
      <a href="#" class="newsItem" title="${item.title}">
        <p class="newsTitle">${item.title}</p>
        <p class="newsDate">${item.date}</p>
      </a>
    </li>
  `
    })
    newsList.innerHTML = newMessage.join('');
  }



  // 添加页脚组件
  let footerScreen = $('#footerScreen');

  function addFooter() {
    $ajax({
      method: 'get',
      url: '../components/footer.html',
      success: function (data) {
        footerScreen.innerHTML = data;
      }
    })
  }
  addFooter();
}

// 控制navActive
let container = $('.container')
let nav = $('.container .nav')
let mainLogo = $('.container #firstScreen .logo')
container.onscroll = function() {
  nav.classList.add('navActive');
  mainLogo.style.display = "none";
  if(container.scrollTop == 0){
    nav.classList.remove('navActive');
    mainLogo.style.display = "block";
  }
}

// 打开按钮点击事件
let buttonOpen = $('.button_open')
let aside = $('.container .aside')
buttonOpen.onclick = function() {
  aside.style.transform = "translateX(0%)"
}

// 关闭按钮
let buttonClose = $('.button_close')
buttonClose.onclick = function() {
  aside.style.transform = "translateX(100%)"
}




let asideUl = $('.data_lists')
let asidelis = $$('.data_lists li a')
asideUl.addEventListener("click",function(e) {
  for(items of asidelis) {
    items.classList.remove('leftActive')
  }
  e.target.classList.add('leftActive')
},false)