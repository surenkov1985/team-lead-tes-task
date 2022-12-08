import "./assets/styles/main.scss";
import $ from "jquery";

$(function () {
	let limit = $(window).height();
	let tempScrollTop = $(document).scrollTop();
	let currentScrollTop = 0;
	let animated = false;
	let target = $("html, body");

	console.log(tempScrollTop % limit);
	if (tempScrollTop % limit !== 0) {
		tempScrollTop += tempScrollTop % limit;
	}
	$(document).on("scroll", function (e) {
		if (animated) return;

		currentScrollTop = $(document).scrollTop();
		if (tempScrollTop < currentScrollTop) {
			animated = true;
			target.stop(true).animate({ scrollTop: tempScrollTop + limit }, 300, "linear", function () {
				animated = false;
				tempScrollTop = $(document).scrollTop();
			});
		} else if (tempScrollTop > currentScrollTop) {
			animated = true;

			target.stop(true).animate({ scrollTop: tempScrollTop - limit }, 300, "linear", function () {
				animated = false;
				tempScrollTop = $(document).scrollTop();
			});
		}
	});

	$(".order-btn").each((_, btn) => {
		$(btn).on("click", (e) => {
			currentScrollTop = $(".order").offset().top;
			animated = true;
			$("html, body").animate(
				{
					scrollTop: $(".order").offset().top,
				},
				600,
				function () {
					tempScrollTop = $(".order").offset().top;
					animated = false;
				}
			);
		});
	});
});
