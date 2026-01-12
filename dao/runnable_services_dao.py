from commons.modules.postgres import *

class runnableServicesDao():
    
    def __init__(self):
        self.postgres = Postgres()

    """
    runnable_service
    """
    def get_runnable_services(self):

        query = f"""
            SELECT
                seq,
                execution_path,
                execution_class,
                execution_method,
                product_name,
                product_desc,
                reg_dt,
                reg_member_seq,
                mod_dt,
                mod_member_seq,
                activate_yn,
                service_options,
                interval_options,
                schedule_options
            FROM
                runnable_services
            WHERE
                delete_yn = 'N'
            ORDER BY
                seq ASC;
        """
        return self.postgres.read_all(query) 
    
    def update_runnable_services(self, params, seq):
        
        # base query
        query = f"""
            UPDATE runnable_services SET
        """
        
        # set query
        set_cluase = ""
        for key, val in params.items():
            set_cluase += f""" {key} = '{val}',"""
        if not set_cluase:
            raise Exception("no params found")
        
        set_cluase = set_cluase[:-1]
        
        # where query
        where_cluase = f" WHERE seq = {seq}"
        
        # bind
        query += set_cluase
        query += where_cluase
        
        # execute
        res = self.postgres.execute_query_with_commit(query)
        return res