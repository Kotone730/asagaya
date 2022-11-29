//1. テキストを含む一般的なモーダル
$(".info").modaal({
	overlay_close:true,//モーダル背景クリック時に閉じるか
	before_open:function(){// モーダルが開く前に行う動作
		$('html').css('overflow-y','hidden');/*縦スクロールバーを出さない*/
	},
	after_close:function(){// モーダルが閉じた後に行う動作
		$('html').css('overflow-y','scroll');/*縦スクロールバーを出す*/
	}
});

$(".openbtn").click(function () {//ボタンがクリックされたら
	$(this).toggleClass('active');//ボタン自身に activeクラスを付与し
    $("#g-nav").toggleClass('panelactive');//ナビゲーションにpanelactiveクラスを付与
});

$("#g-nav a").click(function () {//ナビゲーションのリンクがクリックされたら
    $(".openbtn").removeClass('active');//ボタンの activeクラスを除去し
    $("#g-nav").removeClass('panelactive');//ナビゲーションのpanelactiveクラスも除去
});

$(document).ready(function() {
	$(".animsition").animsition({
	  inClass: 'fade-in',
	  outClass: 'fade-out',
	  inDuration: 1500,
	  outDuration: 800,
	  linkElement: '.animsition-link',
	  // e.g. linkElement: 'a:not([target="_blank"]):not([href^="#"])'
	  loading: true,
	  loadingParentElement: 'body', //animsition wrapper element
	  loadingClass: 'animsition-loading',
	  loadingInner: '', // e.g '<img src="loading.svg" />'
	  timeout: false,
	  timeoutCountdown: 5000,
	  onLoadEvent: true,
	  browser: [ 'animation-duration', '-webkit-animation-duration'],
	  // "browser" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
	  // The default setting is to disable the "animsition" in a browser that does not support "animation-duration".
	  overlay : false,
	  overlayClass : 'animsition-overlay-slide',
	  overlayParentElement : 'body',
	  transition: function(url){ window.location.href = url; }
	});
  });

  var searchBox = '.search-box'; // 絞り込む項目を選択するエリア
var listItem = '.list_item';   // 絞り込み対象のアイテム
var hideClass = 'is-hide';     // 絞り込み対象外の場合に付与されるclass名

$(function() {
  // 絞り込み項目を変更した時
  $(document).on('change', searchBox + ' input', function() {
    search_filter();
  });
});

/**
 * リストの絞り込みを行う
 */
function search_filter() {
  // 非表示状態を解除
  $(listItem).removeClass(hideClass);
  for (var i = 0; i < $(searchBox).length; i++) {
    var name = $(searchBox).eq(i).find('input').attr('name');
    // 選択されている項目を取得
    var searchData = get_selected_input_items(name);
    // 選択されている項目がない、またはALLを選択している場合は飛ばす
    if(searchData.length === 0 || searchData[0] === '') {
      continue;
    }
    // リスト内の各アイテムをチェック
    for (var j = 0; j < $(listItem).length; j++) {
      // アイテムに設定している項目を取得
      var itemData = $(listItem).eq(j).data(name);
      // 絞り込み対象かどうかを調べる
      if(searchData.indexOf(itemData) === -1) {
        $(listItem).eq(j).addClass(hideClass);
      }
    }
  }
}

/**
 * inputで選択されている値の一覧を取得する
 * @param  {String} name 対象にするinputのname属性の値
 * @return {Array}       選択されているinputのvalue属性の値
 */
function get_selected_input_items(name) {
  var searchData = [];
  $('[name=' + name + ']:checked').each(function() {
    searchData.push($(this).val());
  });
  return searchData;
}