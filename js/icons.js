var convertImgSvg = function(className){
    $('img.'+className).each(function(){
      var $img = jQuery(this);
      var imgID = $img.attr('id');
      var imgClass = $img.attr('class');
      var imgURL = $img.attr('src');
      var imgDataToggle = $img.attr('data-toggle');
      var imgTitle = $img.attr('title');
  
      jQuery.get(imgURL, function(data) {
          // Get the SVG tag, ignore the rest
          var $svg = jQuery(data).find('svg');
  
          // Add replaced image's ID to the new SVG
          if(typeof imgID !== 'undefined') {
              $svg = $svg.attr('id', imgID);
          }
          // Add replaced image's classes to the new SVG
          if(typeof imgClass !== 'undefined') {
              $svg = $svg.attr('class', imgClass+' replaced-svg');
          }

          if(typeof imgDataToggle !== 'undefined') {
              $svg = $svg.attr('data-toggle', imgDataToggle);
          }

          if(typeof imgTitle !== 'undefined') {
              $svg = $svg.attr('title', imgTitle);
          }
  
          // Remove any invalid XML tags as per http://validator.w3.org
          $svg = $svg.removeAttr('xmlns:a');
          
          // Check if the viewport is set, else we gonna set it if we can.
          if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
              $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
          }
  
          // Replace image with new SVG
          $img.replaceWith($svg);
  
      }, 'xml');
    });
}

$(document).ready(function(){
  $(window).load(function(){
    convertImgSvg('icons-category');
  });
});