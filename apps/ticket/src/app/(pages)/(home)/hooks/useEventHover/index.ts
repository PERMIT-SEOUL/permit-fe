import { useState } from "react";

export const useEventHover = () => {
  const [hoveredEventId, setHoveredEventId] = useState<number | null>(null);

  const handleEventHover = (eventId: number, isHovered: boolean) => {
    setHoveredEventId(isHovered ? eventId : null);
  };

  const isEventDimmed = (eventId: number) => {
    return hoveredEventId !== null && hoveredEventId !== eventId;
  };

  return {
    hoveredEventId,
    handleEventHover,
    isEventDimmed,
  };
};
