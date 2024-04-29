import { NotesSidebar } from "../NotesComponents/NotesSidebar";

export const NotesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid h-full w-full grid-cols-5 py-4">
      <div className="border-r-2 border-r-slate-300 px-6">
        <NotesSidebar />
      </div>
      <div className="col-span-4 px-6">{children}</div>
    </div>
  );
};
