import Image from 'next/image';
import router from 'next/router';
import { format } from 'date-fns';
import Tag from './Tag';
import { IMAGE_QUALITY } from '~/lib/utils';

interface Props {
  title: string;
  date: Date;
  tags: string[];
  image_src: string | null;
  id: number;
  priority?: boolean;
}

export default function NewsCard({
  title,
  date,
  tags,
  image_src,
  id,
  priority,
}: Props) {
  return (
    <div
      className="flex max-w-sm cursor-pointer flex-col justify-between overflow-hidden rounded bg-zinc-100 shadow-md"
      onClick={() => void router.push(`/news/${id}`)}
    >
      {image_src ? (
        <div className="h-[200px] relative">
          <Image
            className="object-cover"
            src={image_src ?? ''}
            alt="Sunset in the mountains"
            fill
            quality={IMAGE_QUALITY}
            priority={priority}
          />
        </div>
      ) : (
        <div className="h-[200px] w-full bg-gray-300"></div>
      )}

      <div className="flex flex-col gap-4 px-6 py-4">
        <div className="mb-2 text-xl font-bold">{title}</div>
        <p className="text-gray-600">{format(date, 'MMMM d, yyyy')}</p>
      </div>
      <div className="self-start px-6 pb-2 pt-4">
        {tags.map((tag) => (
          <Tag
            key={tag}
            className="outline outline-1"
            value={tag}
            color="text-gray-700"
          />
        ))}
      </div>
    </div>
  );
}
