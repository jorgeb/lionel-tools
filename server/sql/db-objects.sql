create procedure dbo.createLionelItem(@item nvarchar(max))
as begin
	insert into LionelItem
	select *
	from OPENJSON(@item) 
			WITH (
        LionelId varchar(50),
        Title varchar(256),
        Description varchar(max),
        Tags varchar(512),
        LionelPartId varchar(50),
        LionelEraId int,
        GetFrom varchar(800)
      )
end

create procedure [dbo].[createLionelImage](@image nvarchar(max))
as begin
	insert into [LionelImage]
	select *
	from OPENJSON(@image) 
			WITH (
		  LionelId int,
		  FileName varchar(256),
		  Url varchar(800),
		  Title varchar(256),
		  IsDefault bit,
		  Source varchar(50)
      )
end


CREATE VIEW LionelItemImage
AS
select  it.Id, it.LionelId, it.Title, it.Tags, it.GetFrom,
    (Select i.Id, FileName, IsDefault, Source 
	   from [LionelImage] i
		  where it.id = i.lionelId
		  for json auto
    ) AS Images
from 
    LionelItem it
