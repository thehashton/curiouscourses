export type CourseDataType = {
  id: number;
  attributes: {
    title: string;
    description: string;
    createdAt: string;
    publishedAt: string;
    updatedAt: string;
    courseProgress: string;
    lessons: LessonDataType[];
    thumbnail: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
  };
};

export type LessonDataType = {
  data: LessonType[];
};

export type LessonType = {
  id: number;
  attributes: {
    title: string;
    description: string;
    duration: string;
    video_url: string;
    createdAt: string;
    publishedAt: string;
    updatedAt: string;
  };
};
