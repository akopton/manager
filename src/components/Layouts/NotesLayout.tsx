import { NotesSidebar } from "../NotesComponents/NotesSidebar";

export const NotesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid h-full w-full grid-cols-3 p-4">
      <NotesSidebar />
      <div className="col-span-2">{children}</div>
    </div>
  );
};
