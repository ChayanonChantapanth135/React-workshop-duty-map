import { useState } from "react";
import useDutyStore from "../../store/useDutyStore";
import { Users, Clock, Plus, X } from "lucide-react";

// rafce
const PersonelList = () => {
  // Zustand
  const personnel = useDutyStore((state) => state.personnel);
  const locations = useDutyStore((state) => state.locations);
  const assignments = useDutyStore((state) => state.assignments);
  const unassignPerson = useDutyStore((state) => state.unassignPerson);
  const addPerson = useDutyStore((state) => state.addPerson);

  // Form State
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState("");
  const [position, setPosition] = useState("เจ้าหน้าที่");
  const [avatar, setAvatar] = useState("👨‍💼");

  const AVATAR_OPTIONS = ["👨‍✈️", "👩‍✈️", "👨‍💼", "👩‍💼", "👨‍🔧", "👩‍🔧", "👮", "👷"];

  const POSITION_WEIGHTS = {
    "หัวหน้าเวร": 1,
    "รองหัวหน้า": 2,
    "เจ้าหน้าที่": 3,
  };

  const onDragStart = (e, personId) => {
    e.dataTransfer.setData("text/plain", personId);
  };

  // Filter out personnel who are already assigned to an active location and sort them by position rank
  const unassignedPersonnel = personnel
    .filter(
      (person) => !assignments.some((a) => 
        String(a.personId) === String(person.id) && 
        a.locationId && 
        locations.some((loc) => String(loc.id) === String(a.locationId))
      )
    )
    .sort((a, b) => {
      const weightA = POSITION_WEIGHTS[a.position] || 99;
      const weightB = POSITION_WEIGHTS[b.position] || 99;
      return weightA - weightB;
    });

  const onDrop = async (e) => {
    const personId = e.dataTransfer.getData("text/plain");
    if (personId) {
      await unassignPerson(personId);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    await addPerson(name, position, avatar);
    setName("");
    setPosition("เจ้าหน้าที่");
    setAvatar("👨‍💼");
    setIsAdding(false);
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
      className="w-80 bg-white border-r border-gray-200 flex flex-col h-screen shadow-md"
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3 mb-2">
          <Users className="text-blue-500" size={28} />
          <h2 className="text-2xl font-bold text-gray-800">
            รายชื่อเจ้าหน้าที่
          </h2>
        </div>
        <p className="text-sm text-gray-500">ลากไปยังจุด / ลากกลับเพื่อนำออก</p>
      </div>

      {/* List Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {unassignedPersonnel.map((item) => {
          return (
            <div
              key={item.id}
              draggable={true}
              onDragStart={(e) => onDragStart(e, item.id)}
              className="flex items-center gap-3 p-3
          bg-blue-100 border border-blue-300 rounded-lg
          cursor-move hover:shadow-md hover:scale-102 transition-all
          "
            >
              <div className="text-3xl">{item.avatar}</div>

              <div className="flex-1">
                <div className="font-semibold text-gray-800">{item.name}</div>
                <div className="text-xs text-gray-500">{item.position}</div>
              </div>

              <div className="text-gray-400">
                <Clock />
              </div>
            </div>
          );
        })}
        {unassignedPersonnel.length === 0 && (
          <div className="text-center py-8 text-gray-400 text-sm">
            ไม่มีเจ้าหน้าที่ว่างขณะนี้
          </div>
        )}
      </div>

      {/* Sticky Bottom Form */}
      <div className="border-t border-gray-200 bg-gray-50 p-4">
        {!isAdding ? (
          <button
            onClick={() => setIsAdding(true)}
            className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow transition-colors cursor-pointer"
          >
            <Plus size={18} />
            <span>เพิ่มพนักงาน</span>
          </button>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-gray-700">เพิ่มพนักงานใหม่</span>
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Name Input */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">ชื่อ-นามสกุล</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="ระบุชื่อเจ้าหน้าที่"
                className="w-full px-3 py-1.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>

            {/* Position Selector */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">ตำแหน่ง</label>
              <select
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="w-full px-3 py-1.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="หัวหน้าเวร">หัวหน้าเวร</option>
                <option value="รองหัวหน้า">รองหัวหน้า</option>
                <option value="เจ้าหน้าที่">เจ้าหน้าที่</option>
              </select>
            </div>

            {/* Avatar Selector */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">เลือกรูปโปรไฟล์</label>
              <div className="grid grid-cols-4 gap-2">
                {AVATAR_OPTIONS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setAvatar(emoji)}
                    className={`text-2xl p-1 rounded-md border text-center transition-all cursor-pointer ${
                      avatar === emoji
                        ? "bg-blue-100 border-blue-500 scale-110 shadow-sm"
                        : "bg-white border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="flex-1 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                ยกเลิก
              </button>
              <button
                type="submit"
                className="flex-1 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium shadow cursor-pointer"
              >
                บันทึก
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default PersonelList;
