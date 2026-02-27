import { useRef, useEffect, useState, startTransition } from "react";
import { useAnimationFrame } from "framer-motion";

/**
 * ImageTicker Component
 * Adapted from Framer Image Ticker module
 */
const ImageTicker = ({
    images = [],
    speed = 1,
    gap = 16,
    tiltAngle = 15,
    borderRadius = 12
}) => {
    const column1Ref = useRef(null);
    const column2Ref = useRef(null);
    const column3Ref = useRef(null);
    const offset1 = useRef(0);
    const offset2 = useRef(0);
    const offset3 = useRef(0);
    const [shuffledImages, setShuffledImages] = useState(images);
    const [isMobile, setIsMobile] = useState(false);
    const [estimatedWidth, setEstimatedWidth] = useState(500);

    // Initial shuffle on mount
    useEffect(() => {
        const shuffle = (array) => {
            const newArray = [...array];
            for (let i = newArray.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
            }
            return newArray;
        };
        setShuffledImages(shuffle(images));
    }, [images]);

    // Divide images into 3 columns
    const column1Images = shuffledImages.filter((_, i) => i % 3 === 0);
    const column2Images = shuffledImages.filter((_, i) => i % 3 === 1);
    const column3Images = shuffledImages.filter((_, i) => i % 3 === 2);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const checkMobile = () => {
            const width = window.innerWidth;
            const mobile = width < 768;
            setIsMobile(mobile);
            // On mobile, columns are narrower, so we estimate width based on 3 columns in the tilted container
            setEstimatedWidth(mobile ? width * 0.4 : width * 0.33);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useAnimationFrame((time, delta) => {
        const movement = (delta / 1000) * speed * 50;
        offset1.current += movement;
        offset2.current -= movement;
        offset3.current += movement;

        const updateColumn = (ref, offset, columnImages) => {
            if (ref.current) {
                const child = ref.current.querySelector("[data-column-content]");
                if (child && columnImages.length > 0) {
                    const aspectRatio = 472 / 333.77;
                    const imageHeight = (ref.current.offsetWidth || estimatedWidth) / aspectRatio;
                    const totalSetHeight = (imageHeight + gap) * columnImages.length;
                    const normalizedOffset = ((offset % totalSetHeight) + totalSetHeight) % totalSetHeight;
                    child.style.transform = `translate3d(0, ${-normalizedOffset}px, 0)`;
                }
            }
        };

        updateColumn(column1Ref, offset1.current, column1Images);
        updateColumn(column2Ref, offset2.current, column2Images);
        updateColumn(column3Ref, offset3.current, column3Images);
    });

    const renderColumn = (columnImages) => {
        const aspectRatio = 472 / 333.77;
        // Increase repetition to 10 to safely cover the extra long container (200vh/250vh) on all screen sizes
        const repeatedImages = Array(10).fill(columnImages).flat();
        return (
            <div style={{ position: "relative", height: "100%", overflow: "hidden" }}>
                <div
                    data-column-content
                    style={{ position: "absolute", top: 0, left: 0, width: "100%", 恢复: "transform" }}
                >
                    {repeatedImages.map((image, index) => (
                        <div
                            key={index}
                            style={{
                                width: "100%",
                                aspectRatio: `${aspectRatio}`,
                                marginBottom: gap,
                                borderRadius: borderRadius,
                                overflow: "hidden"
                            }}
                        >
                            <img
                                src={typeof image === 'string' ? image : image.src}
                                alt={typeof image === 'string' ? "" : (image.alt || "")}
                                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: borderRadius }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div
            style={{
                width: "100%",
                height: isMobile ? "60vh" : "80vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                position: "relative",
                background: "#000",
                margin: "0px 0"
            }}
        >
            <div
                style={{
                    display: "flex",
                    gap: gap,
                    transform: `rotate(${tiltAngle}deg)`,
                    height: isMobile ? "200vh" : "250vh",
                    width: isMobile ? "150vw" : "120vw",
                    willChange: "transform"
                }}
            >
                <div ref={column1Ref} style={{ flex: 1 }}>
                    {renderColumn(column1Images)}
                </div>
                <div ref={column2Ref} style={{ flex: 1 }}>
                    {renderColumn(column2Images)}
                </div>
                <div ref={column3Ref} style={{ flex: 1 }}>
                    {renderColumn(column3Images)}
                </div>
            </div>
        </div>
    );
};

export default ImageTicker;
