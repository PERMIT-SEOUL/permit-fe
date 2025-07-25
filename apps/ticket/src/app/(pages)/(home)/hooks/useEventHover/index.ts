import { useState } from "react";

export const useEventHover = () => {
  const [hoveredEventId, setHoveredEventId] = useState<string | null>(null);

  const handleEventHover = (eventId: string, isHovered: boolean) => {
    setHoveredEventId(isHovered ? eventId : null);
  };

  const isEventDimmed = (eventId: string) => {
    return hoveredEventId !== null && hoveredEventId !== eventId;
  };

  return {
    hoveredEventId,
    handleEventHover,
    isEventDimmed,
  };
};
