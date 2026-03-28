import type { FilterOption } from "../../entities/user/model";

interface Props {
    topNationalities: FilterOption[];
    topHobbies: FilterOption[];
    selectedNationalities: string[];
    selectedHobbies: string[];
    onToggleNationality: (name: string) => void;
    onToggleHobby: (name: string) => void;
}

export function FilterSidebar({
    topNationalities,
    topHobbies,
    selectedNationalities,
    selectedHobbies,
    onToggleNationality,
    onToggleHobby,
}: Props) {
    return (
        <aside className="w-56 flex-shrink-0 overflow-y-auto border-r border-gray-100 p-4 flex flex-col gap-6">
            <FilterSection
                title="Nationalities"
                options={topNationalities}
                selected={selectedNationalities}
                onToggle={onToggleNationality}
            />
            <FilterSection
                title="Hobbies"
                options={topHobbies}
                selected={selectedHobbies}
                onToggle={onToggleHobby}
            />
        </aside>
    );
}

interface FilterSectionProps {
    title: string;
    options: FilterOption[];
    selected: string[];
    onToggle: (name: string) => void;
}

function FilterSection({ title, options, selected, onToggle }: FilterSectionProps) {
    return (
        <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                {title}
            </h3>
            <ul className="flex flex-col gap-1">
                {options.map((option) => (
                    <li key={option.name}>
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={selected.includes(option.name)}
                                onChange={() => onToggle(option.name)}
                                className="rounded text-blue-600"
                            />
                            <span className="text-sm text-gray-700 group-hover:text-gray-900 flex-1 truncate">
                                {option.name}
                            </span>
                            <span className="text-xs text-gray-400">{option.count}</span>
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
}
