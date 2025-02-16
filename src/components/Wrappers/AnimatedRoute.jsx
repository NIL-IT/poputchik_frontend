import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { slideUpIn } from "../../utils/animation";

const AnimatedRoute = ({ children, variants, ...rest }) => {
  const location = useLocation();

  const getAnimationVariant = () => {
    if (location.pathname === "/" || location.pathname === "/preview") {
      return slideUpIn;
    }
    return variants || slideUpIn;
  };

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={location.key} // Используем уникальный ключ из location
        {...rest}
        variants={getAnimationVariant()}
        initial='initial'
        animate='animate'
        exit='exit'
        className='w-full h-full'>
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedRoute;
