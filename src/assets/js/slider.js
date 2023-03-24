function startglider(){

    function slideAutoPaly(glider, selector, delay = 5000, repeat = true) {
        let autoplay = null;
        const slidesCount = glider.track.childElementCount;
        let nextIndex = 1;
        let pause = true;
    
        function slide() {
            autoplay = setInterval(() => {
                if (nextIndex >= slidesCount) {
                    if (!repeat) {
                        clearInterval(autoplay);
                    } else {
                        nextIndex = 0;
                    }
                }
                glider.scrollItem(nextIndex++);
            }, delay);
        }
    
        slide();
    
        var element = document.querySelector(selector);
        element.addEventListener('mouseover', (event) => {
            if (pause) {
                clearInterval(autoplay);
                pause = false;
            }
        }, 300);
    
        element.addEventListener('mouseout', (event) => {
            if (!pause) {
                slide();
                pause = true;
            }
        }, 300);
    }


    

  //Slide Categorias
  new Glider(document.querySelector('.pets-carousel'), {
      slidesToShow: 5.5,
      slidesToScroll: 1,
      draggable: true,
      arrows: {
        prev: '#das-btns .prev-arrow',
        next: '#das-btns .next-arrow'
      },
      responsive: [
        {
          // screens greater than >= 768px
          breakpoint: 767,
          settings: {
            slidesToShow: 5.5,
            slidesToScroll: '1'
          }
        },{
          // screens greater than >= 1024px
          breakpoint: 1023,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 1
          }
        }
      ]
    });
    
    if (window.innerWidth > 1023) {
      document.querySelector('#slideshow').style.padding = "0 1.5%";
    }

}

export {startglider}