from commons.modules.postgres import *

class HeatmapDao():
    
    def __init__(self):
        self.postgres = Postgres()

    # def get_heatmaps_viewers(self):
    #     query = f"""
    #         SELECT
    #             seq,
    #             page,
    #             title,
    #             "desc",
    #             reg_dt,
    #             reg_member_seq,
    #             mod_dt,
    #             mod_member_seq,
    #             delete_yn
    #         FROM
    #             heatmaps_viewer
    #         WHERE
    #             delete_yn = 'N'
    #         ORDER BY
    #             seq ASC;
    #     """
    #     return self.postgres.read_all(query)
    
    def get_heatmaps_viewers(self):

        query = f"""
            SELECT
                a.seq,
                a.title,
                a."desc",
                a.split,
                a.sort,
                a.reg_dt,
                a.reg_member_seq,
                a.mod_dt,
                a.mod_member_seq,
                a.delete_yn,
                array_agg(b.url) as urls
            FROM
                heatmaps_viewer as a 
            LEFT JOIN heatmaps_viewer_url as b on b.heatmaps_viewer_seq = a.seq
            WHERE
                a.delete_yn = 'N'
            GROUP BY a.seq
            ORDER BY a.sort ASC;
        """
        return self.postgres.read_all(query)
    
    def get_heatmaps_viewers_cnt(self):
        query = f"""
            SELECT
                count(0)
            FROM
                heatmaps_viewer
            WHERE
                delete_yn = 'N';
        """
        return self.postgres.read_one(query)

    def get_heatmaps_viewer(self, seq=None, title=None):

        query = f"""
            SELECT
                seq,
                title,
                "desc",
                split,
                sort,
                reg_dt,
                reg_member_seq,
                mod_dt,
                mod_member_seq,
                delete_yn
            FROM
                heatmaps_viewer
            WHERE
                delete_yn = 'N'
        """
        if seq:
            query += f"AND seq = {seq}"
        if title:
            query += f"AND title = '{title}'"

        return self.postgres.read_one(query)

    def create_heatmaps_viewer(self, params):
        query = f"""
            INSERT INTO heatmaps_viewer
                (title, "desc", split, sort,
                 reg_dt, reg_member_seq,
                 mod_dt, mod_member_seq,
                 delete_yn)
            VALUES (
                '{params['title']}',
                '{params['desc']}',
                '{params['split']}',
                '{params['sort']}',
                now(), 0,
                now(), 0,
                'N'
            );
        """
        return self.postgres.execute_query_with_commit(query)

    def update_heatmaps_viewer(self, params, seq):
        query = f"UPDATE heatmaps_viewer SET "
        
        set_clause = ""
        for key, val in params.items():
            set_clause += f""" {key} = '{val}',"""
        if not set_clause:
            raise Exception("no params found")

        set_clause = set_clause[:-1]
        where_clause = f" WHERE seq = {seq}"

        query += set_clause
        query += where_clause

        return self.postgres.execute_query_with_commit(query)

    def delete_heatmaps_viewer(self, seq, member_seq=0):
        query = f"""
            UPDATE heatmaps_viewer SET
                delete_yn = 'Y',
                mod_dt = now(),
                mod_member_seq = {member_seq}
            WHERE
                seq = {seq};
        """
        return self.postgres.execute_query_with_commit(query)

    def get_urls_by_viewer(self, heatmaps_viewer_seq):
        query = f"""
            SELECT
                seq,
                heatmaps_viewer_seq,
                url,
                reg_dt,
                reg_member_seq,
                mod_dt,
                mod_member_seq,
                delete_yn
            FROM
                heatmaps_viewer_url
            WHERE
                heatmaps_viewer_seq = {heatmaps_viewer_seq}
                AND delete_yn = 'N'
            ORDER BY
                seq ASC;
        """
        return self.postgres.read_all(query)

    def get_heatmaps_viewer_url(self, seq):
        query = f"""
            SELECT
                seq,
                heatmaps_viewer_seq,
                url,
                reg_dt,
                reg_member_seq,
                mod_dt,
                mod_member_seq,
                delete_yn
            FROM
                heatmaps_viewer_url
            WHERE
                seq = {seq}
                AND delete_yn = 'N';
        """
        return self.postgres.read_one(query)

    def create_heatmaps_viewer_url(self, params):
        query = f"""
            INSERT INTO heatmaps_viewer_url
                (heatmaps_viewer_seq, url,
                 reg_dt, reg_member_seq,
                 mod_dt, mod_member_seq,
                 delete_yn)
            VALUES (
                {params['heatmaps_viewer_seq']},
                '{params['url']}',
                now(), {params.get('reg_member_seq', 0)},
                now(), {params.get('mod_member_seq', 0)},
                'N'
            );
        """
        return self.postgres.execute_query_with_commit(query)

    def update_heatmaps_viewer_url(self, params, seq):
        query = f"UPDATE heatmaps_viewer_url SET "

        set_clause = ""
        for key, val in params.items():
            set_clause += f""" {key} = '{val}',"""
        if not set_clause:
            raise Exception("no params found")

        set_clause = set_clause[:-1]
        where_clause = f" WHERE seq = {seq}"

        query += set_clause
        query += where_clause

        return self.postgres.execute_query_with_commit(query)

    def delete_heatmaps_viewer_url(self, heatmaps_viewer_seq):
        query = f"""
            DELETE FROM heatmaps_viewer_url
            WHERE
                heatmaps_viewer_seq = {heatmaps_viewer_seq};
        """
        return self.postgres.execute_query_with_commit(query)