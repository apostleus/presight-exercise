import { Router } from "express";
import { ALL_USERS } from "../data/users.js";

const router = Router();

router.get("/", (req, res) => {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(50, Math.max(1, Number(req.query.limit) || 20));
    const search = String(req.query.search || "").toLowerCase().trim();
    const nationalities = req.query.nationalities
        ? String(req.query.nationalities).split(",").filter(Boolean)
        : [];
    const hobbies = req.query.hobbies
        ? String(req.query.hobbies).split(",").filter(Boolean)
        : [];

    let filtered = ALL_USERS;

    if (search) {
        filtered = filtered.filter(
            (u) =>
                u.first_name.toLowerCase().includes(search) ||
                u.last_name.toLowerCase().includes(search)
        );
    }
    if (nationalities.length) {
        filtered = filtered.filter((u) => nationalities.includes(u.nationality));
    }
    if (hobbies.length) {
        filtered = filtered.filter((u) =>
            hobbies.some((h) => u.hobbies.includes(h))
        );
    }

    let topHobbies: { name: string; count: number }[] = [];
    let topNationalities: { name: string; count: number }[] = [];

    if (page === 1) {
        const hobbyCount = new Map<string, number>();
        const natCount = new Map<string, number>();

        for (const user of filtered) {
            for (const h of user.hobbies) {
                hobbyCount.set(h, (hobbyCount.get(h) ?? 0) + 1);
            }
            natCount.set(user.nationality, (natCount.get(user.nationality) ?? 0) + 1);
        }

        topHobbies = [...hobbyCount.entries()]
            .sort((a, b) => b[1] - a[1])
            .slice(0, 20)
            .map(([name, count]) => ({ name, count }));

        topNationalities = [...natCount.entries()]
            .sort((a, b) => b[1] - a[1])
            .slice(0, 20)
            .map(([name, count]) => ({ name, count }));
    }

    const total = filtered.length;
    const totalPages = Math.ceil(total / limit);
    const data = filtered.slice((page - 1) * limit, page * limit);

    res.json({
        data,
        meta: {
            page,
            limit,
            total,
            totalPages,
            hasNextPage: page < totalPages,
            topHobbies,
            topNationalities,
        },
    });
});

export default router;
