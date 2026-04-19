"use client"
export const Select = ({ options, onSelect, label }: {
    onSelect: (value: string) => void;
    options: {
        key: string;
        value: string;
    }[];
    label?: string;
}) => {
    return <div className="pt-2">
        {label && <label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>}
        <select onChange={(e) => {
            onSelect(e.target.value)
        }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6a51a6] focus:border-[#6a51a6] block w-full p-2.5 transition-colors cursor-pointer outline-none">
            {options.map(option => <option key={option.key} value={option.key}>{option.value}</option>)}
        </select>
    </div>
}