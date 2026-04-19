"use client"

export const TextInput = ({
    placeholder,
    onChange,
    label,
    type = "text"
}: {
    placeholder: string;
    // eslint-disable-next-line no-unused-vars
    onChange: (value: string) => void;
    label: string;
    type?: string;
}) => {
    return <div className="pt-2">
        <label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
        <input 
            onChange={(e) => onChange(e.target.value)} 
            type={type} 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6a51a6] focus:border-[#6a51a6] block w-full p-2.5 transition-colors" 
            placeholder={placeholder} 
        />
    </div>
}