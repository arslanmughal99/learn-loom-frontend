import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";

import { classNames } from "../utils/class-names";

export const GenerateText = ({
  words,
  className,
}: {
  words: string;
  className?: string;
}) => {
  const [scope, animate] = useAnimate();
  let wordsArray = words.split(" ");
  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
      },
      {
        duration: 2,
        delay: stagger(0.2),
      }
    );
  }, [scope.current]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className="opacity-0 text-secondary-foreground"
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={classNames("font-bold", className)}>
      <div className="mt-4">
        <div className=" text-6xl font-bold opacity-80 leading-snug tracking-wide">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
