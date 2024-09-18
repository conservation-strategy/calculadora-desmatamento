import { forwardRef, use, useEffect, useState } from 'react';

const VisibilityTrigger = forwardRef(({ children, targetElementId, excludentElementId }, ref) => {
  const [isTargetVisible, setIsTargetVisible] = useState(false);
  const [isExcludentVisible, setIsExcludentVisible] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(0);

  useEffect(() => {
    const navbarElement = document.getElementById('navbar');

    if (navbarElement) {
      const navbarRect = navbarElement.getBoundingClientRect();
      setNavbarHeight(navbarRect.height);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const targetElement = document.getElementById(targetElementId);
      const excludentElement = document.getElementById(excludentElementId);
      const windowHeight = window.innerHeight;

      // console.log('[VisibilityTrigger] targetElement', targetElement);
      // console.log('[VisibilityTrigger] targetElement.getBoundingClientRect()', targetElement?.getBoundingClientRect());
      // console.log('[VisibilityTrigger] argetRect.top < windowHeight && targetRect.bottom > 0', targetElement?.getBoundingClientRect().top < windowHeight && targetElement.getBoundingClientRect()?.bottom > 0);

      if (targetElement) {
        const targetRect = targetElement.getBoundingClientRect();
        setIsTargetVisible(targetRect.top < windowHeight && targetRect.bottom > 0);
      }

      // console.log('[VisibilityTrigger] excludentElement.getBoundingClientRect().top', excludentElement.getBoundingClientRect().top);
      // console.log('[VisibilityTrigger] excludentElement.getBoundingClientRect().bottom', excludentElement.getBoundingClientRect().bottom);
      // console.log('[VisibilityTrigger] windowHeight', windowHeight);
      // console.log('[VisibilityTrigger] navbarHeight', navbarHeight);
      // console.log('[VisibilityTrigger] (0 + navbarHeight + 24)', (0 + navbarHeight + 24));
      

      if (excludentElement) {
        const excludentRect = excludentElement.getBoundingClientRect();
        // setIsExcludentVisible(excludentRect.top < windowHeight && (excludentRect.bottom > (0 + navbarHeight + 24))); // 24 is an extra space to trigger the visibility sooner
        setIsExcludentVisible(excludentRect.bottom > (0 + navbarHeight + 24)); // 24 is an extra space to trigger the visibility sooner
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check visibility on initial render

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [targetElementId, excludentElementId, navbarHeight]);

  // Show children when target is visible AND excludent is not visible
  return (
      <div className={`${isTargetVisible && !isExcludentVisible ? 'opacity-100 pointer-events-default' : 'opacity-0 pointer-events-none'} transition-opacity duration-300 ease-in-out`}>
        {children}
      </div> 
    ) 
});

export default VisibilityTrigger;