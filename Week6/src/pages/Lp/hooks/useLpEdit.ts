import { useState } from 'react';

import { postImagePrivate } from '@/apis/image';
import { usePatchLp } from '@/features/lps/hooks/usePatchLp';
import { LpItem } from '@/types/lps';

function useLpEdit(lp: LpItem) {
  const { mutate: patchLp } = usePatchLp();

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const startEdit = () => {
    setIsEditing(true);
    setTitle(lp.title);
    setContent(lp.content);
    setPreviewUrl(lp.thumbnail);
    setFile(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreviewUrl(URL.createObjectURL(f));
  };

  const submitEdit = async () => {
    let thumbnailUrl = lp.thumbnail;
    if (file) {
      const res = await postImagePrivate(file);
      thumbnailUrl = res.data.imageUrl;
    }

    patchLp(
      {
        lpId: lp.id,
        title: title.trim(),
        content: content.trim(),
        thumbnail: thumbnailUrl,
        tags: lp.tags.map((tag) => tag.name),
        published: true,
      },
      {
        onSuccess: () => setIsEditing(false),
      },
    );
  };

  return {
    isEditing,
    title,
    content,
    previewUrl,
    file,
    setTitle,
    setContent,
    startEdit,
    handleFileChange,
    submitEdit,
    cancelEdit: () => setIsEditing(false),
  };
}

export default useLpEdit;
