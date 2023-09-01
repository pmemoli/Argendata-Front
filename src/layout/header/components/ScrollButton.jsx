import React, { useEffect, useState } from 'react';

export default function ScrollButton({ type }) {
  const [isVisible, setIsVisible] = useState(true);

const updateButtonVisibility = () => {
  const parentElement = document.getElementById('slider');
  const { scrollLeft, scrollWidth, clientWidth } = parentElement;

  console.log(scrollLeft, scrollWidth, clientWidth, type)

  if (type === 'right') {
    setIsVisible(scrollLeft + 3 < scrollWidth - clientWidth);
  } 
  
  else {
    setIsVisible(scrollLeft > 0)
  }
};


  useEffect(() => {
    const parentElement = document.getElementById('slider');
    parentElement.addEventListener('scroll', updateButtonVisibility);
    window.addEventListener('resize', updateButtonVisibility);
    updateButtonVisibility();
    return () => {
        window.removeEventListener('resize', updateButtonVisibility);
        parentElement.removeEventListener('scroll', updateButtonVisibility);
    };
  }, [type]);

  const handleClick = () => {
    const parentElement = document.getElementById('slider');
    const scrollAmount = type === 'right' ? 200 : -200;
    parentElement.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const style = type === 'right' ? 'right-0' : 'left-0';

  return (
    <button
      onClick={handleClick}
      className={`lg:hidden bg-[hsl(215,21%,11%)] z-[1] absolute top-[1.2rem] w-5 ${style} ${!isVisible && 'hidden'}`}
    >
      <img src={require(type === 'right' ? '../../../assets/right.png' : '../../../assets/left.png')} />
    </button>
  );
}
