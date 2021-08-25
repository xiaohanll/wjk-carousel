// 添加监听事件
window.addEventListener('load',function(){
  // 获取DOM元素
  var btn_left = document.getElementById('left');
  var btn_right = document.getElementById('right');
  var box = document.getElementById('box');
  var imgs = box.querySelector('.imgs'); 
  var img = imgs.querySelectorAll('li'); //返回一个li的数组

  // 设置定时器，实现自动切换效果
  // 设置自动翻页时是向右翻页
  var autoTurn = setInterval(function(){
    rightTurn()
  },1000);
  // 定时器的返回值是一个number类型，代表是第几个定时器
  // 清除定时器clearInterval(timer)=clearInterval(定时器的个数)

  // 实现鼠标移到box上，两侧按钮出现，自动切换停止
  box.addEventListener('mouseover',function(){
    // 显示按钮
    btn_left.style.display = 'block';
    btn_right.style.display = 'block';
    // 停止自动切换，清除定时器
    clearInterval(autoTurn);
    // 释放内存占用：清除autoTurn，但是函数调用后内存无法释放
    autoTurn = null;
  })

  // 实现鼠标移出box，两侧按钮消失，自动翻页
  box.addEventListener('mouseout',function(){
    // 隐藏按钮
    btn_left.style.display = 'none';
    btn_right.style.display = 'none';
    // 开始自动切换，恢复定时器
    clearInterval(autoTurn);
    autoTurn = setInterval(function(){
      rightTurn();
    }, 1000);
  })


  // 动态生成小圆圈
  var list = box.querySelector('.list');
  for(let i=0; i<imgs.children.length; i++){
    // 创建li
    let li = document.createElement('li');
    list.appendChild(li);
    // 给小圈圈添加类名
    li.setAttribute('index',i);
    // 给li添加监听事件，鼠标进入小圆圈变色
    li.addEventListener('mouseenter',color);
    // 给li添加监听事件，鼠标进入小圆圈跳转图片
    li.addEventListener('mouseenter',jump);
  }

  // 初始页面是第二个圆圈显示其他颜色
  list.children[1].className = 'change';
  // 变色函数(排他思想)
  function color() {
    // 先将所有小圆圈设置变白：删除类名
    for(let i=0; i<list.children.length; i++){
      list.children[i].className = '';
    }
    var index = this.getAttribute('index');
    list.children[index].className = 'change';
  }

  // 跳转函数
  function jump() {
    // 获取触发mouseover事件的li的索引
    var index = this.getAttribute('index');
    // 展示的永远是class='two'，获取nums中two的索引
    var now = nums.indexOf('two');
    // 计算经过点与当前点的距离
    var diff = Math.abs(now-index);
    // 如果是index>now，右翻页diff次；index<now，左翻页diff次
    if(index > now) {
      while(diff--){
        rightTurn()
      }
    }else{
      while(diff--){
        leftTurn()
      }
    }
  }

  // 小圆圈跟随图片移动
  // 排他思想
  // 不管生成几个小圆圈，最初展示的都是第二张图片，因此最初的j为1。
  var j = 1;
  function colorChange() {
    // 先将所有li的类名清除
    for(let i=0; i<list.children.length; i++){
      list.children[i].className = '';
    }
    // 在右翻页时，每调用一次rightTurn()，j就会加1，直到j加到5，赋值为0，从头开始
    if(j>5) {
      j=0;
    }else if(j<0){
      // 在左翻页时，每调用一次leftTurn(),j就会减1，直到j减到小于0，赋值为5，从最后一张图片开始
      j=5;
    }
    // 将索引为j的li的类名设置为change
    list.children[j].className = 'change';
  }

  // 翻页函数
  var nums = ['one','two','three','four','five','six'];
  // var len = nums.length-1;
  // 右翻页函数
  function rightTurn() {
    // 把数组最后一个添加到第一个
    nums.unshift(nums[5]);
    // 删除数组中的最后一个
    nums.pop();
    // 此时nums=['six','one','two','three','four','five']
    // 重新设置类名：将最后一个的类名设置为one，依次类推
    for(let i=0; i<6; i++){
      img[i].setAttribute('class',nums[i]);
    }
    // 右翻页时，小圆圈的索引加一，并改变颜色
    j++;
    colorChange();
  }
  // 左翻页函数
  function leftTurn() {
    // 把数组第一项添加到最后面
    nums.push(nums[0]);
    // 删除数组第一项
    nums.shift();
    // 此时nums=['two','three','four','five','six','one']
    // 重新设置类名：将第一个的类名设置为two，依次类推
    for(let i=0; i<6; i++){
      img[i].setAttribute('class',nums[i]);
    }
    // 左翻页时，小圆圈的索引减1，并改变颜色
    j--;
    colorChange();
  }

  // 点击按钮实现图片切换
  // var rightBtn = document.querySelector('#left');
  btn_right.addEventListener('click', function() {
    rightTurn();
  })
  // var leftBtn = document.querySelector('#right');
  btn_left.addEventListener('click',function() {
    leftTurn();
  })

})