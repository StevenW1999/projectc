--! Simple name based search query
select "Name", "Description", "PlantSize"  
from "Project C"."Plant" as Plant
where Plant."Name" LIKE '%aven%'

--! Simple category + name search query
select "Name", "Description", "PlantSize" 
from "Project C"."Plant" as Plant
where Plant."Name" LIKE '%%' and Plant."Category_id" = 0

--! Previous query ordered by alphabet
select "Name", "Description", "PlantSize"  
from "Project C"."Plant" as Plant
where Plant."Name" LIKE '%%' and Plant."Category_id" = 0
order by Plant."Name" asc

--! Previous query ordered on timestamp intead of name
select "Name", "Description", "Timestamp", "PlantSize"  
from "Project C"."Plant" as Plant
where Plant."Name" LIKE '%%' and Plant."Category_id" = 0
order by Plant."Timestamp" asc

--! Previous query, ordered by PlantSize
select "Name", "Description", "Timestamp", "PlantSize" 
from "Project C"."Plant" as Plant
where Plant."Name" LIKE '%%' and Plant."Category_id" = 0
order by Plant."PlantSize"