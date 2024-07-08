import supabase from './supabase';

const BUCKET_NAME = 'repository';

export const SUPABASE_STORAGE_ENDPOINT =
  'https://dpgavaoinmbrfeciwdhf.supabase.co/storage/v1/object/public/repository/' as const;

export async function uploadFile(path: string, file: File) {
  const result = await supabase.storage.from(BUCKET_NAME).upload(path, file, {
    upsert: true, //overwrite when if file exist
  });

  return result;
}

export async function downloadFile(path: string) {
  const result = await supabase.storage.from(BUCKET_NAME).download(path);
  return result;
}

export async function deleteFiles(path: string[]) {
  const result = await supabase.storage
    .from(BUCKET_NAME)
    .remove(path.map((file) => file.replace(SUPABASE_STORAGE_ENDPOINT, '')));
  return result;
}
