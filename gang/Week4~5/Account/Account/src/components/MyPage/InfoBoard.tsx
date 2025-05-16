
interface InfoBoardProps {
  isEditing: boolean;
  name:string;
  bio:string
  email:string;
  setName: (value: string) => void;
  setBio: (value: string) => void;
  setEmail: (value: string) => void;
}

const InfoBoard = ({
  name,
  bio,
  email,
  isEditing,
  setBio,
  setEmail,
  setName,
}: InfoBoardProps) => {
  return (
    <>
      {isEditing ? (
        <div className="m-2">
          <div className="flex flex-row justify-between items-center">
            <textarea
              className=" size-15 w-64 text-4xl font-medium p-2 rounded-3xl resize-none text-left  bg-transparent"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-row justify-between items-center">
            <textarea
              className="size-15 w-64 text-2xl font-medium p-2 rounded-3xl resize-none text-left  bg-transparent "
              value={bio ?? ""}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          <div className="flex flex-row justify-between items-center">
            <textarea
              className="size-15 w-64  text-2xl font-medium p-2 rounded-3xl resize-none text-left  bg-transparent "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-row justify-between items-center">
            <p className="text-4xl font-medium p-2">{name}</p>
          </div>
          <div className="flex flex-row justify-between items-center">
            <p className="text-2xl font-medium p-2">{bio}</p>
          </div>
          <div className="flex flex-row justify-between items-center">
            <p className="text-2xl font-medium p-2">{email}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default InfoBoard;
