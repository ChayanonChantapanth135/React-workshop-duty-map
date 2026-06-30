import { Plus, X } from "lucide-react";

// rafce
const Header = ({ adding, setAdding }) => {
  // js

  return (
    <div
      className="p-4 bg-white shadow-md border-b
        border-gray-200"
    >
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">
          ระบบจัดการเวรประจำจุด
        </h2>

        <button
          onClick={() => setAdding((prev) => !prev)}
          className={`flex items-center gap-2 p-2 rounded-md
          ${
            adding
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-green-500 text-white hover:bg-green:600"
          }
          `}
        >
          {adding ? (
            <>
              <X size={20} />
              ยกเลิก{" "}
            </>
          ) : (
            <>
              <Plus size={20} />
              เพิ่มจุดเวร{" "}
            </>
          )}
        </button>
      </div>

      {adding && (
        <div className="mt-2 text-sm text-amber-600 bg-amber-100 p-3 rounded-lg border ">
          คลิกบนแผนที่เพื่อเพิ่มตำแหน่งเข้าเวร
        </div>
      )}
    </div>
  );
};
export default Header;
