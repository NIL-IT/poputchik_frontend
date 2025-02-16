import { motion, AnimatePresence } from "framer-motion";
import { modalFade, backdropFade, modalSlideUp } from "../../utils/animation";

const AnimatedModal = ({ isOpen, onClose, children, variants = modalFade, modalType = "center" }) => {
  const getModalStyles = () => {
    switch (modalType) {
      case "bottom":
        return "fixed inset-x-0 bottom-0 z-50";
      case "fullscreen":
        return "fixed inset-0 z-50 overflow-y-auto bg-white";
      case "center":
        return "fixed inset-0 z-50 flex items-center justify-center";
      default:
        return "fixed inset-x-0 bottom-0 z-50";
    }
  };

  const getContentStyles = () => {
    switch (modalType) {
      case "bottom":
        return "w-full bg-white rounded-t-2xl";
      case "fullscreen":
        return "w-full min-h-screen";
      case "center":
        return "mx-4";
      default:
        return "";
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className='fixed inset-0 bg-black/50 z-40'
            variants={backdropFade}
            initial='initial'
            animate='animate'
            exit='exit'
            onClick={onClose}
          />

          <motion.div
            className={getModalStyles()}
            variants={variants}
            initial='initial'
            animate='animate'
            exit='exit'>
            <div className={getContentStyles()}>{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AnimatedModal;
