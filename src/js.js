window.onload = function() {
	var oul = document.getElementById('ul2');
	var Item = oul.getElementsByTagName('li');
	for(var i = 0; i < Item.length; i++) {
		Item[i].index = i
		Item[i].onclick = function() {
			for(var i = 0; i < Item.length; i++) {
				Item[i].className = ""
				alert('1')
			}
			this.className = "current"
		}
	}

	var start = 0
	id = 'jingxuan';
	shangpin(start, id)
	$('.item_cell').click(function() {
		start = 0;
		$('.shangpin').empty();
		id = $(this).attr('id')
		shangpin(start, id)
	})
	$('#more').click(function() {
		start += 4;
		shangpin(start, id)
	})

	function shangpin(start, id) {
		$.ajax({
			type: "post",
			url:"http://10.115.11.224/supermarket/data/get_commodity.php",
			async: true,
			data: {
				'start': start,
				'classify': id
			},
			dataType: 'jsonp',
			jsonp: 'callback',
			jsonpCallback: 'success_JsonpCallback',
			success: function(data) {
				//debugger;
				if(data != null && data.length > 0) {
					var html = '';
					for(var i = 0; i < data.length; i++) {
						html += '<div class="wyc_box" style="display:block;"><ul class="back"><li><img src="http://10.115.11.224/supermarket/img/' + id + '/' + data[i].img + '" /></li><li>' + data[i].name + '</li><p>月销' + data[i].count + '件</p><li class="jg">￥' + data[i].price + '<span><img src="../img/rmgw.png"/></span></li></ul></div>';
					}
					$('.shangpin').append(html);
				}
				if(data && data.length == 4) {
					$('#more').show();
				} else {
					$('#more').hide();
				}
			},
		});
	}
	$('.ref').click(function() {
		window.location.reload()
	})
}