import { useEffect, useRef, useState } from 'react';

const VisibilityTrigger = ({ children, targetElementId }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const targetElement = document.getElementById(targetElementId);
      if (targetElement) {
        const targetPosition = targetElement.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (targetPosition < windowHeight) {
          setIsVisible(true);
          window.removeEventListener('scroll', handleScroll);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check visibility on initial render

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [targetElementId]);

  return isVisible ? children : null;
};

export default VisibilityTrigger;