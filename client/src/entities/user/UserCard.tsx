import React from "react";
import type { User } from "./model";

interface Props {
    user: User;
    style?: React.CSSProperties;
}

export function UserCard({ user, style }: Props) {
    const visibleHobbies = user.hobbies.slice(0, 2);
    const hiddenCount = user.hobbies.length - 2;

    return (
        <div style={style} className="absolute inset-x-0 px-4 py-1">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-4 h-[104px]">
                <img
                    src={user.avatar}
                    alt={`${user.first_name} ${user.last_name}`}
                    className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                />

                <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 truncate">
                        {user.first_name} {user.last_name}
                    </div>
                    <div className="text-sm text-gray-500 mt-0.5">
                        {user.nationality} · {user.age} лет
                    </div>

                    <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                        {visibleHobbies.map((hobby) => (
                            <span
                                key={hobby}
                                className="text-xs bg-[#e6f6ff] text-[#0077cc] px-2 py-0.5 rounded-full"
                            >
                                {hobby}
                            </span>
                        ))}
                        {hiddenCount > 0 && (
                            <span className="text-xs text-gray-400">
                                +{hiddenCount}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
