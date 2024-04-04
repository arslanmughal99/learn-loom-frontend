import { useEffect, useState } from "react";
import { useWindowScroll } from "@uidotdev/usehooks";

const defaultOffSet = 100;

export function useShowHeader() {
    const l = typeof window !== 'undefined' ? useWindowScroll : () => [{ y: null }];
    const [{ y }] = l();
    const [show, setShow] = useState(true);
    const [previousPosition, setPreviousPosition] = useState(0);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        if (!y) { setShow(true) }
        else if (y <= defaultOffSet) {
            setShow(true);
        } else if (y < previousPosition) {
            setShow(true)
        } else {
            setShow(false)
        }

        setPreviousPosition(y ?? 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [y])


    return { show }
}