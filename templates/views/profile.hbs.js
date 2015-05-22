var profile = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "		<div class=\"project__summary layout vertical stretch pack-end start\" style=\"background-image: url("
    + escapeExpression(((helpers.cloudinaryUrl || (depth0 && depth0.cloudinaryUrl) || helperMissing).call(depth0, {"name":"cloudinaryUrl","hash":{
    'crop': ("fill"),
    'height': ("737"),
    'width': ("400")
  },"data":data})))
    + ")\">\r\n";
},"3":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "					<img src=\""
    + escapeExpression(((helpers.cloudinaryUrl || (depth0 && depth0.cloudinaryUrl) || helperMissing).call(depth0, {"name":"cloudinaryUrl","hash":{
    'crop': ("fill"),
    'height': ("140"),
    'width': ("140")
  },"data":data})))
    + "\" alt=\"\"/>\r\n";
},"5":function(depth0,helpers,partials,data) {
  var stack1, helper, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing, buffer = "						<div class=\"comments__item layout horizontal center\">\r\n\r\n								<div class=\"avatar avatar_small\">\r\n";
  stack1 = helpers['with'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.author : depth0)) != null ? stack1.profile : stack1)) != null ? stack1.avatar : stack1), {"name":"with","hash":{},"fn":this.program(6, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "								</div>\r\n								<div class=\"comments__item_content flex\">\r\n									<p>\r\n										"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.author : depth0)) != null ? stack1.name : stack1)) != null ? stack1.first : stack1), depth0))
    + " "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.author : depth0)) != null ? stack1.name : stack1)) != null ? stack1.last : stack1), depth0))
    + "\r\n									</p>\r\n										<p>\r\n												"
    + escapeExpression(((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"text","hash":{},"data":data}) : helper)))
    + "\r\n										</p>\r\n								</div>\r\n								<button class=\"comments__item_like\">\r\n										<span class=\"icon-heart\"></span>\r\n								</button>\r\n						</div>\r\n";
},"6":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "									<img src=\""
    + escapeExpression(((helpers.cloudinaryUrl || (depth0 && depth0.cloudinaryUrl) || helperMissing).call(depth0, {"name":"cloudinaryUrl","hash":{
    'crop': ("fill"),
    'height': ("140"),
    'width': ("140")
  },"data":data})))
    + "\" alt=\"\"/>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "";
  stack1 = helpers['with'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.profile : stack1)) != null ? stack1.cover : stack1), {"name":"with","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "				<div class=\"avatar avatar_big\">\r\n";
  stack1 = helpers['with'].call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.profile : stack1)) != null ? stack1.avatar : stack1), {"name":"with","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "				</div>\r\n				<div class=\"layout horizontal center\">\r\n						<div class=\"flex\">\r\n								<h2 class=\"project__summary_title\">\r\n									"
    + escapeExpression(lambda(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.profile : stack1)) != null ? stack1.user : stack1)) != null ? stack1.name : stack1)) != null ? stack1.first : stack1), depth0))
    + " "
    + escapeExpression(lambda(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.profile : stack1)) != null ? stack1.user : stack1)) != null ? stack1.name : stack1)) != null ? stack1.last : stack1), depth0))
    + "\r\n								</h2>\r\n								<div class=\"project__summary_description\">\r\n										";
  stack1 = lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.profile : stack1)) != null ? stack1.about : stack1)) != null ? stack1['short'] : stack1), depth0);
  if (stack1 != null) { buffer += stack1; }
  buffer += "\r\n								</div>\r\n						</div>\r\n						<button class=\"project__favorite\">\r\n								<span class=\"icon-heart\"></span>\r\n						</button>\r\n				</div>\r\n		</div>\r\n\r\n        <div class=\"layout vertical chat-panel\" data-chat-tag=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.profile : stack1)) != null ? stack1.user : stack1)) != null ? stack1.slug : stack1), depth0))
    + "\">\r\n            <div class=\"scroll\">\r\n                <div class=\"chat-panel__list layout vertical\">\r\n                </div>\r\n            </div>\r\n        </div>\r\n		<!--<div class=\"project__comments scroll\">\r\n				<div class=\"comments__list layout vertical\">\r\n";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.comments : stack1), {"name":"each","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "				</div>\r\n		</div>-->\r\n		<!-- <div class=\"project__masonry layout fluid vertical stretch\">\r\n				<div class=\"masonry__list flex\">\r\n						<div class=\"masonry__list_item item_mega wp_item wp_item__video\">\r\n								<img src=\"image-b-1.jpg\" alt=\"\"/>\r\n								<div class=\"wp_item__data layout vertical stretch fluid h100\">\r\n										<div class=\"flex\"></div>\r\n										<div class=\"layout horizontal pack-center\">\r\n												<div class=\"video__play\"><span class=\"icon-play\"></span></div>\r\n										</div>\r\n										<div class=\"flex\"></div>\r\n										<h4>Запись стрима 20 сентрябся</h4>\r\n										<div class=\"wp_item__data_meta layout horizontal stretch\">\r\n												<p class=\"wp_item__data_date\">3 октября</p>\r\n										</div>\r\n								</div>\r\n						</div>\r\n						<div class=\"masonry__list_item item_high wp_item\">\r\n								<img src=\"image-b-2.jpg\" alt=\"\"/>\r\n								<div class=\"wp_item__data layout vertical stretch pack-end fluid h100\">\r\n										<div class=\"user layout horizontal center\">\r\n												<div class=\"avatar avatar_small\">\r\n														<img src=\"avatar-1.jpg\" alt=\"\"/>\r\n												</div>\r\n												<a class=\"user__name\" href=\"#\">Алер Денисов</a>\r\n										</div>\r\n										<h3>Отчет о первом дне</h3>\r\n										<div class=\"wp_item__data_meta layout horizontal stretch\">\r\n												<p class=\"wp_item__data_date\">3 октября</p>\r\n										</div>\r\n								</div>\r\n						</div>\r\n						<div class=\"masonry__list_item item_high wp_item wp_item__video\">\r\n								<img src=\"image-1.jpg\" alt=\"\"/>\r\n								<div class=\"wp_item__data layout vertical stretch fluid h100\">\r\n										<div class=\"flex\"></div>\r\n										<div class=\"layout horizontal pack-center\">\r\n												<div class=\"video__play\"><span class=\"icon-play\"></span></div>\r\n										</div>\r\n										<div class=\"flex\"></div>\r\n										<h4>Запись стрима 20 сентрябся</h4>\r\n										<div class=\"wp_item__data_meta layout horizontal stretch\">\r\n												<p class=\"wp_item__data_date\">3 октября</p>\r\n										</div>\r\n								</div>\r\n						</div>\r\n				</div>\r\n		</div> -->\r\n";
},"useData":true});