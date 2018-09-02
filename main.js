document.addEventListener('DOMContentLoaded', function(){

  var inputs = document.getElementsByTagName('input');

  for (var i=0; i < inputs.length; i ++ ) {
    inputs[i].addEventListener('input', inputHandler);
  }

  function inputHandler(e) {

    var value = 0;
    var row = e.target.parentNode.parentNode;
    var pos = e.target.className.split(/\s/)[0];

    switch(pos) {
      case 'se_b':
        e.target.value = e.target.value.replace(/[^0-9.]/,'');
        if (/^[0-9]*(\.[0-9]*)?$/.test(e.target.value)) {
          value = Number(e.target.value);
          e.target.className = e.target.className.replace(' error','');
          price({ se_b: value, row });
        } else {
          if (e.target.className.indexOf('error') < 0)
            e.target.className += ' error';
          row.getElementsByClassName('tsubo')[0].innerHTML = '';
          row.getElementsByClassName('kingaku')[0].innerHTML = '';
        }
        break;
      case 'se_c':
        value = Number(e.target.value.replace(/[^0-9]/g,''));
        e.target.value = value > 0 ? value.toLocaleString('ja-JP') : '';
        price({ se_c: value, row });
        break;
      default:
        break;
    }
  }

  function price({se_b, se_c, row }) {
    if (!row) return;

    var se01bNode = row.getElementsByClassName('se_b')[0];
    var se01cNode = row.getElementsByClassName('se_c')[0];

    se_b = (se_b >= 0 ? se_b : Number(se01bNode.value));
    se_c = (se_c >= 0 ? se_c : Number(se01cNode.value.replace(/[^0-9]/g,'')));

    var tsubo = se_b * 0.3025;
    var kingaku = tsubo * se_c;

    tsubo = Math.floor(tsubo * 100.0) / 100.0;  // 少数点第3位以下を切り捨て

    var tsuboNode = row.getElementsByClassName('tsubo')[0];
    var kingakuNode = row.getElementsByClassName('kingaku')[0];

    tsuboNode.innerHTML = (tsubo > 0 ? `<b>${tsubo} 坪</b>` : '');
    kingakuNode.innerHTML =  (kingaku > 0 ? `<b>${kingaku.toLocaleString('ja-JP')} 円</b>` : "");
  }
});
